// Disease prediction service for Krishi Vaani
// This service analyzes weather data to predict disease risks

import type { WeatherData } from "@/lib/weather-service"

// Types for disease risk data
export type DiseaseRisk = {
  diseaseName: string
  riskLevel: "low" | "moderate" | "high" | "severe"
  riskScore: number // 0-100
  riskFactors: string[]
  preventiveMeasures: string[]
  symptoms: string[]
  affectedCrops: string[]
  icon: string
}

export type CropDiseaseRisk = {
  crop: string
  diseases: DiseaseRisk[]
  overallRisk: "low" | "moderate" | "high" | "severe"
  overallRiskScore: number // 0-100
}

// Database of common crop diseases and their weather-related risk factors
const cropDiseaseDatabase = {
  rice: [
    {
      diseaseName: "Rice Blast",
      pathogen: "Magnaporthe oryzae",
      conditions: {
        temperature: { min: 20, optimal: 28, max: 32 },
        humidity: { min: 85, optimal: 95, max: 100 },
        leafWetness: { min: 9, optimal: 16, max: 24 }, // hours
        rainfall: { min: 5, optimal: 15, max: 30 }, // mm
      },
      symptoms: [
        "Diamond-shaped lesions with gray centers on leaves",
        "Infected nodes turn blackish and break easily",
        "Panicle neck may break, causing empty grains",
      ],
      preventiveMeasures: [
        "Use resistant varieties",
        "Apply balanced fertilization (avoid excess nitrogen)",
        "Maintain good field drainage",
        "Apply fungicides containing tricyclazole or isoprothiolane at early disease onset",
      ],
      affectedCrops: ["Rice"],
      icon: "leaf-off",
    },
    {
      diseaseName: "Bacterial Leaf Blight",
      pathogen: "Xanthomonas oryzae pv. oryzae",
      conditions: {
        temperature: { min: 25, optimal: 30, max: 34 },
        humidity: { min: 70, optimal: 85, max: 100 },
        rainfall: { min: 10, optimal: 20, max: 40 }, // mm
      },
      symptoms: [
        "Water-soaked yellowish stripes on leaf margins",
        "Lesions turn white to yellow and then gray",
        "Entire leaves may become blighted and die",
      ],
      preventiveMeasures: [
        "Use resistant varieties",
        "Avoid clipping of seedling leaves during transplanting",
        "Ensure proper spacing between plants",
        "Apply copper-based bactericides during early stages",
      ],
      affectedCrops: ["Rice"],
      icon: "bacteria",
    },
  ],
  wheat: [
    {
      diseaseName: "Wheat Rust (Leaf Rust)",
      pathogen: "Puccinia triticina",
      conditions: {
        temperature: { min: 15, optimal: 20, max: 25 },
        humidity: { min: 60, optimal: 80, max: 100 },
        leafWetness: { min: 6, optimal: 12, max: 24 }, // hours
      },
      symptoms: [
        "Orange-brown pustules on leaves and stems",
        "Circular to oval pustules on upper leaf surface",
        "Severe infections cause leaf yellowing and death",
      ],
      preventiveMeasures: [
        "Plant resistant varieties",
        "Early sowing to avoid favorable disease conditions",
        "Apply fungicides with propiconazole or tebuconazole",
        "Crop rotation with non-host crops",
      ],
      affectedCrops: ["Wheat"],
      icon: "alert-circle",
    },
    {
      diseaseName: "Powdery Mildew",
      pathogen: "Blumeria graminis f. sp. tritici",
      conditions: {
        temperature: { min: 15, optimal: 22, max: 28 },
        humidity: { min: 50, optimal: 70, max: 90 },
        lowRainfall: true, // Prefers dry conditions with high humidity
      },
      symptoms: [
        "White powdery patches on leaves and stems",
        "Patches turn gray-brown with age",
        "Severe infections cause leaf yellowing and premature death",
      ],
      preventiveMeasures: [
        "Use resistant varieties",
        "Avoid dense planting",
        "Apply sulfur-based fungicides or triadimefon",
        "Balanced fertilization (avoid excess nitrogen)",
      ],
      affectedCrops: ["Wheat", "Barley"],
      icon: "snowflake",
    },
  ],
  tomato: [
    {
      diseaseName: "Late Blight",
      pathogen: "Phytophthora infestans",
      conditions: {
        temperature: { min: 10, optimal: 18, max: 24 },
        humidity: { min: 80, optimal: 90, max: 100 },
        leafWetness: { min: 8, optimal: 12, max: 24 }, // hours
        rainfall: { min: 5, optimal: 15, max: 30 }, // mm
      },
      symptoms: [
        "Dark, water-soaked lesions on leaves",
        "White fuzzy growth on undersides of leaves",
        "Brown lesions on stems and fruits",
      ],
      preventiveMeasures: [
        "Use resistant varieties",
        "Improve air circulation by proper spacing",
        "Apply fungicides containing chlorothalonil or mancozeb preventively",
        "Avoid overhead irrigation",
      ],
      affectedCrops: ["Tomato", "Potato"],
      icon: "cloud-rain",
    },
    {
      diseaseName: "Early Blight",
      pathogen: "Alternaria solani",
      conditions: {
        temperature: { min: 24, optimal: 29, max: 35 },
        humidity: { min: 60, optimal: 75, max: 90 },
        leafWetness: { min: 6, optimal: 10, max: 24 }, // hours
      },
      symptoms: [
        "Dark brown lesions with concentric rings on leaves",
        "Lesions often have yellow halos",
        "Older leaves are affected first",
      ],
      preventiveMeasures: [
        "Crop rotation with non-solanaceous crops",
        "Remove and destroy infected plant debris",
        "Apply fungicides containing azoxystrobin or chlorothalonil",
        "Maintain adequate plant nutrition",
      ],
      affectedCrops: ["Tomato", "Potato", "Eggplant"],
      icon: "target",
    },
  ],
  potato: [
    {
      diseaseName: "Late Blight",
      pathogen: "Phytophthora infestans",
      conditions: {
        temperature: { min: 10, optimal: 18, max: 24 },
        humidity: { min: 80, optimal: 90, max: 100 },
        leafWetness: { min: 8, optimal: 12, max: 24 }, // hours
        rainfall: { min: 5, optimal: 15, max: 30 }, // mm
      },
      symptoms: [
        "Dark, water-soaked lesions on leaves",
        "White fuzzy growth on undersides of leaves",
        "Brown lesions on stems and tubers",
      ],
      preventiveMeasures: [
        "Use resistant varieties",
        "Improve air circulation by proper spacing",
        "Apply fungicides containing chlorothalonil or mancozeb preventively",
        "Avoid overhead irrigation",
      ],
      affectedCrops: ["Potato", "Tomato"],
      icon: "cloud-rain",
    },
    {
      diseaseName: "Black Scurf",
      pathogen: "Rhizoctonia solani",
      conditions: {
        temperature: { min: 15, optimal: 22, max: 28 },
        soilMoisture: { min: 60, optimal: 80, max: 100 },
        coolSoil: true,
      },
      symptoms: [
        "Black, irregular sclerotia on tuber surface",
        "Reddish-brown lesions on underground stems and stolons",
        "Stunted plants with aerial tubers",
      ],
      preventiveMeasures: [
        "Plant certified disease-free seed tubers",
        "Allow soil to warm before planting",
        "Crop rotation with non-host crops",
        "Seed treatment with fungicides",
      ],
      affectedCrops: ["Potato"],
      icon: "disc",
    },
  ],
  cotton: [
    {
      diseaseName: "Cotton Leaf Curl Virus",
      pathogen: "Cotton leaf curl virus (CLCuV)",
      conditions: {
        temperature: { min: 25, optimal: 30, max: 35 },
        humidity: { min: 60, optimal: 75, max: 90 },
        whiteflies: true, // Transmitted by whiteflies
      },
      symptoms: [
        "Upward or downward curling of leaves",
        "Thickened veins and enations on undersides of leaves",
        "Stunted growth and reduced yield",
      ],
      preventiveMeasures: [
        "Use resistant varieties",
        "Control whitefly populations with appropriate insecticides",
        "Early sowing to avoid peak whitefly populations",
        "Remove and destroy infected plants",
      ],
      affectedCrops: ["Cotton"],
      icon: "bug",
    },
    {
      diseaseName: "Bacterial Blight",
      pathogen: "Xanthomonas citri pv. malvacearum",
      conditions: {
        temperature: { min: 25, optimal: 30, max: 35 },
        humidity: { min: 80, optimal: 90, max: 100 },
        rainfall: { min: 10, optimal: 20, max: 40 }, // mm
      },
      symptoms: [
        "Angular, water-soaked lesions on leaves",
        "Lesions turn brown with yellow halos",
        "Black lesions on stems and bolls",
      ],
      preventiveMeasures: [
        "Use resistant varieties",
        "Use acid-delinted seeds",
        "Crop rotation with non-host crops",
        "Apply copper-based bactericides",
      ],
      affectedCrops: ["Cotton"],
      icon: "bacteria",
    },
  ],
  maize: [
    {
      diseaseName: "Northern Corn Leaf Blight",
      pathogen: "Exserohilum turcicum",
      conditions: {
        temperature: { min: 18, optimal: 24, max: 27 },
        humidity: { min: 80, optimal: 90, max: 100 },
        leafWetness: { min: 6, optimal: 12, max: 18 }, // hours
      },
      symptoms: [
        "Long, elliptical gray-green lesions on leaves",
        "Lesions turn tan-brown with age",
        "Severe infections cause significant leaf blighting",
      ],
      preventiveMeasures: [
        "Plant resistant hybrids",
        "Crop rotation with non-host crops",
        "Apply fungicides containing azoxystrobin or pyraclostrobin",
        "Proper field sanitation",
      ],
      affectedCrops: ["Maize", "Corn"],
      icon: "leaf",
    },
    {
      diseaseName: "Common Rust",
      pathogen: "Puccinia sorghi",
      conditions: {
        temperature: { min: 16, optimal: 22, max: 25 },
        humidity: { min: 70, optimal: 85, max: 100 },
        leafWetness: { min: 6, optimal: 10, max: 24 }, // hours
      },
      symptoms: [
        "Small, circular to elongated cinnamon-brown pustules on leaves",
        "Pustules appear on both leaf surfaces",
        "Severe infections cause leaf yellowing and death",
      ],
      preventiveMeasures: [
        "Plant resistant hybrids",
        "Early planting to avoid favorable disease conditions",
        "Apply fungicides containing azoxystrobin or pyraclostrobin",
        "Proper field sanitation",
      ],
      affectedCrops: ["Maize", "Corn"],
      icon: "alert-circle",
    },
  ],
  onion: [
    {
      diseaseName: "Purple Blotch",
      pathogen: "Alternaria porri",
      conditions: {
        temperature: { min: 21, optimal: 25, max: 30 },
        humidity: { min: 80, optimal: 90, max: 100 },
        leafWetness: { min: 8, optimal: 12, max: 24 }, // hours
      },
      symptoms: [
        "Small, water-soaked lesions that turn brown to purple",
        "Lesions develop concentric rings",
        "Affected leaves may die from the tip downward",
      ],
      preventiveMeasures: [
        "Crop rotation with non-allium crops",
        "Proper plant spacing for good air circulation",
        "Apply fungicides containing chlorothalonil or mancozeb",
        "Avoid overhead irrigation",
      ],
      affectedCrops: ["Onion", "Garlic"],
      icon: "target",
    },
    {
      diseaseName: "Downy Mildew",
      pathogen: "Peronospora destructor",
      conditions: {
        temperature: { min: 10, optimal: 15, max: 22 },
        humidity: { min: 80, optimal: 95, max: 100 },
        leafWetness: { min: 6, optimal: 12, max: 24 }, // hours
        rainfall: { min: 5, optimal: 15, max: 30 }, // mm
      },
      symptoms: [
        "Pale, elongated patches on leaves",
        "Grayish-violet fuzzy growth on lesions",
        "Affected leaves may yellow and collapse",
      ],
      preventiveMeasures: [
        "Plant resistant varieties",
        "Crop rotation with non-allium crops",
        "Apply fungicides containing mancozeb or metalaxyl",
        "Improve air circulation by proper spacing",
      ],
      affectedCrops: ["Onion", "Garlic", "Leek"],
      icon: "droplets",
    },
  ],
  sugarcane: [
    {
      diseaseName: "Red Rot",
      pathogen: "Colletotrichum falcatum",
      conditions: {
        temperature: { min: 25, optimal: 30, max: 35 },
        humidity: { min: 80, optimal: 90, max: 100 },
        rainfall: { min: 10, optimal: 20, max: 40 }, // mm
      },
      symptoms: [
        "Reddening of internal stalk tissues",
        "White patches in the reddened areas",
        "Drying of leaves and wilting of plants",
      ],
      preventiveMeasures: [
        "Use resistant varieties",
        "Use healthy seed cane for planting",
        "Hot water treatment of seed cane (50°C for 2 hours)",
        "Proper field sanitation",
      ],
      affectedCrops: ["Sugarcane"],
      icon: "flame",
    },
    {
      diseaseName: "Smut",
      pathogen: "Sporisorium scitamineum",
      conditions: {
        temperature: { min: 25, optimal: 30, max: 35 },
        humidity: { min: 70, optimal: 80, max: 90 },
        drought: true, // More severe under drought conditions
      },
      symptoms: [
        "Black whip-like structures emerging from the growing point",
        "Stunted growth and tillering",
        "Narrow, erect leaves",
      ],
      preventiveMeasures: [
        "Plant resistant varieties",
        "Use healthy seed cane for planting",
        "Hot water treatment of seed cane (52°C for 30 minutes)",
        "Remove and destroy infected plants",
      ],
      affectedCrops: ["Sugarcane"],
      icon: "wind",
    },
  ],
}

// Function to calculate disease risk based on weather conditions
export function calculateDiseaseRisk(weatherData: WeatherData, crop: string): CropDiseaseRisk | { error: string } {
  // Normalize crop name to match our database keys
  const normalizedCrop = crop.toLowerCase()

  // Check if we have disease data for this crop
  if (!cropDiseaseDatabase[normalizedCrop as keyof typeof cropDiseaseDatabase]) {
    return { error: `No disease data available for ${crop}` }
  }

  // Get disease data for this crop
  const diseaseData = cropDiseaseDatabase[normalizedCrop as keyof typeof cropDiseaseDatabase]

  // Calculate risk for each disease
  const diseaseRisks: DiseaseRisk[] = diseaseData.map((disease) => {
    // Calculate risk score based on current and forecast weather conditions
    const riskScore = calculateRiskScore(disease, weatherData)

    // Determine risk level based on score
    let riskLevel: "low" | "moderate" | "high" | "severe" = "low"
    if (riskScore >= 75) riskLevel = "severe"
    else if (riskScore >= 50) riskLevel = "high"
    else if (riskScore >= 25) riskLevel = "moderate"

    // Determine risk factors
    const riskFactors = determineRiskFactors(disease, weatherData)

    return {
      diseaseName: disease.diseaseName,
      riskLevel,
      riskScore,
      riskFactors,
      preventiveMeasures: disease.preventiveMeasures,
      symptoms: disease.symptoms,
      affectedCrops: disease.affectedCrops,
      icon: disease.icon,
    }
  })

  // Calculate overall risk
  const overallRiskScore = diseaseRisks.reduce((sum, disease) => sum + disease.riskScore, 0) / diseaseRisks.length

  // Determine overall risk level
  let overallRisk: "low" | "moderate" | "high" | "severe" = "low"
  if (overallRiskScore >= 75) overallRisk = "severe"
  else if (overallRiskScore >= 50) overallRisk = "high"
  else if (overallRiskScore >= 25) overallRisk = "moderate"

  // Sort diseases by risk score (highest first)
  diseaseRisks.sort((a, b) => b.riskScore - a.riskScore)

  return {
    crop,
    diseases: diseaseRisks,
    overallRisk,
    overallRiskScore,
  }
}

// Helper function to calculate risk score for a disease based on weather conditions
function calculateRiskScore(disease: any, weatherData: WeatherData): number {
  let score = 0
  let factorsConsidered = 0

  // Temperature factor
  if (disease.conditions.temperature) {
    factorsConsidered++
    const currentTemp = weatherData.current.temp
    const { min, optimal, max } = disease.conditions.temperature

    if (currentTemp >= min && currentTemp <= max) {
      // Calculate how close the current temperature is to the optimal temperature
      const tempScore = 100 - (Math.abs(currentTemp - optimal) / Math.max(optimal - min, max - optimal)) * 100
      score += Math.max(0, tempScore) // Ensure score is not negative
    }
  }

  // Humidity factor
  if (disease.conditions.humidity) {
    factorsConsidered++
    const currentHumidity = weatherData.current.humidity
    const { min, optimal, max } = disease.conditions.humidity

    if (currentHumidity >= min && currentHumidity <= max) {
      // Calculate how close the current humidity is to the optimal humidity
      const humidityScore = 100 - (Math.abs(currentHumidity - optimal) / Math.max(optimal - min, max - optimal)) * 100
      score += Math.max(0, humidityScore) // Ensure score is not negative
    }
  }

  // Rainfall factor
  if (disease.conditions.rainfall) {
    factorsConsidered++
    // Check recent rainfall (last 3 days)
    const recentRainfall = weatherData.forecast.slice(0, 3).reduce((sum, day) => sum + day.rainfall, 0)
    const { min, optimal, max } = disease.conditions.rainfall

    if (recentRainfall >= min && recentRainfall <= max) {
      // Calculate how close the recent rainfall is to the optimal rainfall
      const rainfallScore = 100 - (Math.abs(recentRainfall - optimal) / Math.max(optimal - min, max - optimal)) * 100
      score += Math.max(0, rainfallScore) // Ensure score is not negative
    }
  }

  // Leaf wetness factor (approximated from humidity and rainfall)
  if (disease.conditions.leafWetness) {
    factorsConsidered++
    // Approximate leaf wetness hours based on humidity and rainfall
    const estimatedLeafWetness =
      (weatherData.current.humidity >= 85 ? 12 : weatherData.current.humidity >= 75 ? 8 : 4) +
      (weatherData.current.precipitation > 0 ? 6 : 0)

    const { min, optimal, max } = disease.conditions.leafWetness

    if (estimatedLeafWetness >= min && estimatedLeafWetness <= max) {
      // Calculate how close the estimated leaf wetness is to the optimal leaf wetness
      const leafWetnessScore =
        100 - (Math.abs(estimatedLeafWetness - optimal) / Math.max(optimal - min, max - optimal)) * 100
      score += Math.max(0, leafWetnessScore) // Ensure score is not negative
    }
  }

  // Special conditions
  if (disease.conditions.lowRainfall && weatherData.forecast.slice(0, 3).every((day) => day.rainfall < 5)) {
    factorsConsidered++
    score += 100
  }

  if (disease.conditions.drought && weatherData.agriculturalMetrics.soilMoisture < 40) {
    factorsConsidered++
    score += 100
  }

  if (disease.conditions.coolSoil && weatherData.current.temp < 18) {
    factorsConsidered++
    score += 100
  }

  if (disease.conditions.whiteflies && weatherData.current.temp > 28 && weatherData.current.humidity > 60) {
    factorsConsidered++
    score += 100
  }

  // Calculate average score
  return factorsConsidered > 0 ? score / factorsConsidered : 0
}

// Helper function to determine risk factors for a disease based on weather conditions
function determineRiskFactors(disease: any, weatherData: WeatherData): string[] {
  const factors: string[] = []

  // Temperature factor
  if (disease.conditions.temperature) {
    const currentTemp = weatherData.current.temp
    const { min, optimal, max } = disease.conditions.temperature

    if (currentTemp >= optimal - 2 && currentTemp <= optimal + 2) {
      factors.push(`Optimal temperature (${currentTemp.toFixed(1)}°C) for disease development`)
    } else if (currentTemp >= min && currentTemp <= max) {
      factors.push(`Favorable temperature (${currentTemp.toFixed(1)}°C) for disease development`)
    }
  }

  // Humidity factor
  if (disease.conditions.humidity) {
    const currentHumidity = weatherData.current.humidity
    const { min, optimal, max } = disease.conditions.humidity

    if (currentHumidity >= optimal - 5 && currentHumidity <= optimal + 5) {
      factors.push(`Optimal humidity (${currentHumidity.toFixed(0)}%) for disease development`)
    } else if (currentHumidity >= min && currentHumidity <= max) {
      factors.push(`Favorable humidity (${currentHumidity.toFixed(0)}%) for disease development`)
    }
  }

  // Rainfall factor
  if (disease.conditions.rainfall) {
    // Check recent rainfall (last 3 days)
    const recentRainfall = weatherData.forecast.slice(0, 3).reduce((sum, day) => sum + day.rainfall, 0)
    const { min, optimal, max } = disease.conditions.rainfall

    if (recentRainfall >= optimal - 5 && recentRainfall <= optimal + 5) {
      factors.push(`Optimal rainfall (${recentRainfall.toFixed(1)} mm) for disease development`)
    } else if (recentRainfall >= min && recentRainfall <= max) {
      factors.push(`Favorable rainfall (${recentRainfall.toFixed(1)} mm) for disease development`)
    }
  }

  // Leaf wetness factor
  if (disease.conditions.leafWetness) {
    // Approximate leaf wetness hours based on humidity and rainfall
    const estimatedLeafWetness =
      (weatherData.current.humidity >= 85 ? 12 : weatherData.current.humidity >= 75 ? 8 : 4) +
      (weatherData.current.precipitation > 0 ? 6 : 0)

    if (estimatedLeafWetness >= disease.conditions.leafWetness.min) {
      factors.push(`Extended leaf wetness periods favorable for infection`)
    }
  }

  // Special conditions
  if (disease.conditions.lowRainfall && weatherData.forecast.slice(0, 3).every((day) => day.rainfall < 5)) {
    factors.push(`Dry conditions favorable for disease development`)
  }

  if (disease.conditions.drought && weatherData.agriculturalMetrics.soilMoisture < 40) {
    factors.push(`Drought stress increases susceptibility`)
  }

  if (disease.conditions.coolSoil && weatherData.current.temp < 18) {
    factors.push(`Cool soil temperatures favor pathogen`)
  }

  if (disease.conditions.whiteflies && weatherData.current.temp > 28 && weatherData.current.humidity > 60) {
    factors.push(`Conditions favorable for whitefly vectors`)
  }

  // If no specific factors were identified but the disease has a moderate to high risk score,
  // add a general factor
  if (factors.length === 0) {
    factors.push(`Current weather conditions may support disease development`)
  }

  return factors
}

// Function to get preventive recommendations based on disease risks
export function getPreventiveRecommendations(diseaseRisks: CropDiseaseRisk): string[] {
  const recommendations: string[] = []

  // If no diseases or low overall risk, provide general recommendations
  if (diseaseRisks.overallRisk === "low") {
    recommendations.push("Continue regular monitoring of your crop for any signs of disease")
    recommendations.push("Maintain good field sanitation practices")
    recommendations.push("Ensure balanced nutrition for strong plant health")
    return recommendations
  }

  // Get the top 2 highest risk diseases
  const topDiseases = diseaseRisks.diseases.slice(0, 2)

  // Add specific recommendations for each high-risk disease
  topDiseases.forEach((disease) => {
    if (disease.riskLevel === "high" || disease.riskLevel === "severe") {
      recommendations.push(`For ${disease.diseaseName} prevention:`)
      // Add the top 3 preventive measures for this disease
      disease.preventiveMeasures.slice(0, 3).forEach((measure) => {
        recommendations.push(`- ${measure}`)
      })
    }
  })

  // Add general recommendations based on overall risk
  if (diseaseRisks.overallRisk === "severe") {
    recommendations.push("Consider applying preventive fungicides/bactericides immediately")
    recommendations.push("Increase monitoring frequency to daily checks")
  } else if (diseaseRisks.overallRisk === "high") {
    recommendations.push("Consider applying preventive treatments within the next few days")
    recommendations.push("Monitor your crop every 2-3 days for early symptoms")
  } else if (diseaseRisks.overallRisk === "moderate") {
    recommendations.push("Prepare preventive treatments but wait for early symptoms before applying")
    recommendations.push("Monitor your crop weekly for any signs of disease")
  }

  return recommendations
}
