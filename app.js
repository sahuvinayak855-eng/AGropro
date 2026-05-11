const DB_NAME = "agrimap-fertiliser-db";
const STORE_NAME = "regions";
const DB_VERSION = 1;

const sampleRegions = [
  { region: "Ludhiana", crop: "Wheat", fertiliser: 245, recommended: 165, water: 78 },
  { region: "Karnal", crop: "Rice", fertiliser: 230, recommended: 155, water: 84 },
  { region: "Nashik", crop: "Grapes", fertiliser: 190, recommended: 150, water: 46 },
  { region: "Guntur", crop: "Chilli", fertiliser: 210, recommended: 140, water: 58 },
  { region: "Coimbatore", crop: "Cotton", fertiliser: 175, recommended: 160, water: 35 },
  { region: "Baramati", crop: "Sugarcane", fertiliser: 285, recommended: 205, water: 72 },
  { region: "Raipur", crop: "Paddy", fertiliser: 162, recommended: 145, water: 62 },
  { region: "Hisar", crop: "Mustard", fertiliser: 136, recommended: 125, water: 41 }
];

const state = {
  records: [],
  selectedId: null,
  cropFilter: "all",
  search: ""
};

const elements = {
  heroRiskScore: document.querySelector("#hero-risk-score"),
  heroRiskCopy: document.querySelector("#hero-risk-copy"),
  metricRegions: document.querySelector("#metric-regions"),
  metricOveruse: document.querySelector("#metric-overuse"),
  metricWater: document.querySelector("#metric-water"),
  metricYield: document.querySelector("#metric-yield"),
  cropFilter: document.querySelector("#crop-filter"),
  mapGrid: document.querySelector("#map-grid"),
  selectedName: document.querySelector("#selected-name"),
  selectedSummary: document.querySelector("#selected-summary"),
  selectedCrop: document.querySelector("#selected-crop"),
  selectedUse: document.querySelector("#selected-use"),
  selectedRecommended: document.querySelector("#selected-recommended"),
  selectedPriority: document.querySelector("#selected-priority"),
  recordForm: document.querySelector("#record-form"),
  resetData: document.querySelector("#reset-data"),
  searchInput: document.querySelector("#search-input"),
  recordsBody: document.querySelector("#records-body")
};

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true
        });
        store.createIndex("region", "region", { unique: false });
        store.createIndex("crop", "crop", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transaction(storeMode = "readonly") {
  return openDatabase().then((db) => ({
    db,
    store: db.transaction(STORE_NAME, storeMode).objectStore(STORE_NAME)
  }));
}

async function getAllRecords() {
  const { db, store } = await transaction();
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      db.close();
      resolve(request.result);
    };
    request.onerror = () => reject(request.error);
  });
}

async function addRecord(record) {
  const { db, store } = await transaction("readwrite");
  return new Promise((resolve, reject) => {
    const request = store.add(record);
    request.onsuccess = () => {
      db.close();
      resolve();
    };
    request.onerror = () => reject(request.error);
  });
}

async function deleteRecord(id) {
  const { db, store } = await transaction("readwrite");
  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => {
      db.close();
      resolve();
    };
    request.onerror = () => reject(request.error);
  });
}

async function clearRecords() {
  const { db, store } = await transaction("readwrite");
  return new Promise((resolve, reject) => {
    const request = store.clear();
    request.onsuccess = () => {
      db.close();
      resolve();
    };
    request.onerror = () => reject(request.error);
  });
}

function calculateOveruse(record) {
  return Math.max(0, Number(record.fertiliser) - Number(record.recommended));
}

function calculateRisk(record) {
  const overuse = calculateOveruse(record);
  const overuseScore = Math.min(70, overuse * 0.75);
  const waterScore = Number(record.water) * 0.3;
  return Math.round(Math.min(100, overuseScore + waterScore));
}

function riskLevel(score) {
  if (score >= 62) return "high";
  if (score >= 34) return "medium";
  return "low";
}

function priorityText(score) {
  if (score >= 62) return "Critical";
  if (score >= 34) return "Watch";
  return "Balanced";
}

function filteredRecords() {
  return state.records.filter((record) => {
    const cropMatches = state.cropFilter === "all" || record.crop === state.cropFilter;
    const search = state.search.toLowerCase();
    const searchMatches =
      record.region.toLowerCase().includes(search) || record.crop.toLowerCase().includes(search);
    return cropMatches && searchMatches;
  });
}

function updateMetrics() {
  const records = state.records;
  const count = records.length || 1;
  const avgOveruse = records.reduce((sum, record) => sum + calculateOveruse(record), 0) / count;
  const avgWater = records.reduce((sum, record) => sum + Number(record.water), 0) / count;
  const avgRisk = records.reduce((sum, record) => sum + calculateRisk(record), 0) / count;

  elements.metricRegions.textContent = records.length;
  elements.metricOveruse.textContent = Math.round(avgOveruse);
  elements.metricWater.textContent = `${Math.round(avgWater)}%`;
  elements.metricYield.textContent = `${Math.round(avgRisk)}%`;
  elements.heroRiskScore.textContent = Math.round(avgRisk);
  elements.heroRiskCopy.textContent =
    avgRisk >= 62
      ? "Several areas need urgent nutrient-balancing and water protection."
      : "Current records show opportunities for targeted, efficient application.";
}

function renderCropFilter() {
  const crops = [...new Set(state.records.map((record) => record.crop))].sort();
  elements.cropFilter.innerHTML = '<option value="all">All crops</option>';
  crops.forEach((crop) => {
    const option = document.createElement("option");
    option.value = crop;
    option.textContent = crop;
    elements.cropFilter.appendChild(option);
  });
  elements.cropFilter.value = state.cropFilter;
}

function renderMap() {
  const records = filteredRecords();
  elements.mapGrid.innerHTML = "";

  records.forEach((record) => {
    const score = calculateRisk(record);
    const level = riskLevel(score);
    const cell = document.createElement("button");
    cell.className = `map-cell risk-${level}`;
    cell.type = "button";
    cell.innerHTML = `
      <strong>${record.region}</strong>
      <span>${record.crop}</span>
      <span>${calculateOveruse(record)} kg/ha over</span>
      <span>${score}% risk</span>
    `;
    cell.addEventListener("click", () => {
      state.selectedId = record.id;
      renderSelected(record);
    });
    elements.mapGrid.appendChild(cell);
  });

  if (!records.length) {
    elements.mapGrid.innerHTML = '<p class="empty-state">No matching records in the database.</p>';
  }
}

function renderSelected(record = state.records[0]) {
  if (!record) return;
  const score = calculateRisk(record);
  elements.selectedName.textContent = record.region;
  elements.selectedSummary.textContent = `${record.region} is mapped as ${priorityText(
    score
  ).toLowerCase()} priority because it uses ${calculateOveruse(
    record
  )} kg/ha more fertiliser than the recommendation, with ${record.water}% water sensitivity.`;
  elements.selectedCrop.textContent = record.crop;
  elements.selectedUse.textContent = `${record.fertiliser} kg/ha`;
  elements.selectedRecommended.textContent = `${record.recommended} kg/ha`;
  elements.selectedPriority.textContent = `${priorityText(score)} (${score}%)`;
}

function renderTable() {
  const records = filteredRecords();
  elements.recordsBody.innerHTML = "";

  records.forEach((record) => {
    const score = calculateRisk(record);
    const level = riskLevel(score);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${record.region}</td>
      <td>${record.crop}</td>
      <td>${record.fertiliser} kg/ha</td>
      <td>${record.recommended} kg/ha</td>
      <td><span class="risk-pill risk-${level}">${score}%</span></td>
      <td><button class="delete-button" type="button" data-id="${record.id}">Delete</button></td>
    `;
    elements.recordsBody.appendChild(row);
  });
}

function render() {
  updateMetrics();
  renderCropFilter();
  renderMap();
  renderSelected(state.records.find((record) => record.id === state.selectedId) || state.records[0]);
  renderTable();
}

async function seedDatabaseIfEmpty() {
  const existing = await getAllRecords();
  if (existing.length) return existing;
  for (const record of sampleRegions) {
    await addRecord(record);
  }
  return getAllRecords();
}

async function reloadRecords() {
  state.records = await getAllRecords();
  render();
}

elements.recordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(elements.recordForm);
  await addRecord({
    region: formData.get("region").trim(),
    crop: formData.get("crop").trim(),
    fertiliser: Number(formData.get("fertiliser")),
    recommended: Number(formData.get("recommended")),
    water: Number(formData.get("water"))
  });
  elements.recordForm.reset();
  await reloadRecords();
});

elements.resetData.addEventListener("click", async () => {
  await clearRecords();
  for (const record of sampleRegions) {
    await addRecord(record);
  }
  state.cropFilter = "all";
  state.search = "";
  elements.searchInput.value = "";
  await reloadRecords();
});

elements.cropFilter.addEventListener("change", (event) => {
  state.cropFilter = event.target.value;
  renderMap();
  renderTable();
});

elements.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderMap();
  renderTable();
});

elements.recordsBody.addEventListener("click", async (event) => {
  if (!event.target.matches(".delete-button")) return;
  await deleteRecord(Number(event.target.dataset.id));
  await reloadRecords();
});

seedDatabaseIfEmpty()
  .then((records) => {
    state.records = records;
    render();
  })
  .catch((error) => {
    console.error("Database failed to load", error);
  });
