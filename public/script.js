let model;
let class_indices;
let fileUpload = document.getElementById("uploadImage");
let img = document.getElementById("image");
let boxResult = document.querySelector(".box-result");
let confidence = document.querySelector(".confidence");
let pconf = document.querySelector(".box-result p");
const data = {
  disease: '',
  index: ''
};

const cureJSON = {
  "Apple___Apple_scab": "N/A",
  "Apple___Black_rot": "N/A",
  "Apple___Cedar_apple_rust": "N/A",
  "Apple___healthy": "Your plant is not infected",
  "Blueberry___healthy": "Your plant is not infected",
  "Cherry_(including_sour)___Powdery_mildew": "N/A",
  "Cherry_(including_sour)___healthy": "N/A",
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "N/A",
  "Corn_(maize)___Common_rust_": "N/A",
  "Corn_(maize)___Northern_Leaf_Blight": "N/A",
  "Corn_(maize)___healthy": "Your plant is not infected",
  "Grape___Black_rot": "N/A",
  "Grape___Esca_(Black_Measles)": "N/A",
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "N/A",
  "Grape___healthy": "Your plant is not infected",
  "Orange___Haunglongbing_(Citrus_greening)": "N/A",
  "Peach___Bacterial_spot": "N/A",
  "Peach___healthy": "Your plant is not infected",
  "Pepper,_bell___Bacterial_spot": "N/A",
  "Pepper,_bell___healthy": "Your plant is not infected",
  "Potato___Early_blight":"Common on tomato and potato plants, early blight is caused by the fungus Alternaria solani and occurs throughout the United States. Symptoms first appear on the lower, older leaves as small brown spots with concentric rings that form a “bull’s eye” pattern. As the disease matures, it spreads outward on the leaf surface causing it to turn yellow, wither and die. Eventually the stem, fruit and upper portion of the plant will become infected. Crops can be severely damaged.<br/>Early blight overwinters on infected plant tissue and is spread by splashing rain, irrigation, insects and garden tools. The disease is also carried on tomato seeds and in potato tubers. In spite of its name, early blight can occur any time throughout the growing season. High temperatures (80-85˚F.) and wet, humid conditions promote its rapid spread. In many cases, poorly nourished or stressed plants are attacked.<br/><br/>Treatment<br/><br/>1.Prune or stake plants to improve air circulation and reduce fungal problems.<br/><br/>2.Make sure to disinfect your pruning shears (one part bleach to 4 parts water) after each cut.<br/><br/>3.Keep the soil under plants clean and free of garden debris. Add a layer of organic compost to prevent the spores from splashing back up onto vegetation.<br/><br/>4.Drip irrigation and soaker hoses can be used to help keep the foliage dry.<br/><br/>5.For best control, apply copper-based fungicides early, two weeks before disease normally appears or when weather forecasts predict a long period of wet weather. Alternatively, begin treatment when disease first appears, and repeat every 7-10 days for as long as needed.<br/><br/>6.Containing copper and pyrethrins, Bonide® Garden Dust is a safe, one-step control for many insect attacks and fungal problems. For best results, cover both the tops and undersides of leaves with a thin uniform film or dust. Depending on foliage density, 10 oz will cover 625 sq ft. Repeat applications every 7-10 days, as needed.<br/><br/>7.SERENADE Garden is a broad spectrum, preventative bio-fungicide recommended for the control or suppression of many important plant diseases. For best results, treat prior to foliar disease development or at the first sign of infection. Repeat at 7-day intervals or as needed.<br/><br/>8.Remove and destroy all garden debris after harvest and practice crop rotation the following year.<br/><br/>9.Burn or bag infected plant parts. Do NOT compost.",
  "Potato___Late_blight": "N/A",
  "Potato___healthy": "Your plant is not infected",
  "Raspberry___healthy": "Your plant is not infected",
  "Soybean___healthy": "Your plant is not infected",
  "Squash___Powdery_mildew": "N/A",
  "Strawberry___Leaf_scorch": "N/A",
  "Strawberry___healthy": "Your plant is not infected",
  "Tomato___Bacterial_spot": "N/A",
  "Tomato___Early_blight": "N/A",
  "Tomato___Late_blight": "Since late blight favors wet, cool weather for infection, cultural practices have a relatively small effect on controlling this disease. Bottom-watering via drip irrigation will be beneficial. Plants should be spaced relatively wide within the row to facilitate air movement, and plants should not be handled when the foliage is wet.<br/><br/>Mulching with plastic or an organic material will reduce the development of early blight more than late blight, but these diseases often work in tandem to destroy tomato plants. Staking or caging tomatoes will result in faster drying of the foliage. Before planting, inspect transplants for any symptoms of disease. Avoid planting tomatoes on sites that were previously in potatoes or close to potatoes. Sequential planting or planting several crops of tomatoes over time will reduce the risk of late blight destroying all tomatoes at once.<br/><br/>Spraying fungicides is the most effective way to prevent late blight. For conventional gardeners and commercial producers, protectant fungicides such as chlorothalonil (e.g., Bravo, Echo, Equus, or Daconil) and Mancozeb (Manzate) can be used. Fixed copper products (Kocide) can be used by organic gardeners to prevent late blight infection. Read the label on any fungicide before application. For fungicides that target the fungus specifically, consult the 2009 Commercial Vegetable Production Guide.<br/><br/>If conditions are favorable for late blight development, start a weekly spray application immediately after transplanting. Otherwise, apply protectant fungicides beginning at flowering for control of late blight and other tomato diseases.",
  "Tomato___Leaf_Mold": "N/A",
  "Tomato___Septoria_leaf_spot": "The effects of Septoria leaf spot can be minimized by following a multifaceted approach to disease management that includes sanitary, cultural, and chemical methods. It is very important to eliminate initial sources of inoculum by removing or destroying as much of the tomato debris as possible after harvest in the fall. Alternatively, in large fields where plant removal is not practical, plant debris can be covered and buried by deep plowing. These simple sanitary practices can significantly reduce disease development the following year since they remove sources of the fungus that overwinter in the soil. During the growing season, it is important to start with healthy, disease-free transplants. If infected plants are found, rogue the seedlings before transplanting them into the field. It is also helpful to practice crop rotation with a non-Solanaceous crop, if possible. Since water is important to both the spread and development of this disease, it is helpful to avoid overhead watering or to water early in the day so that the leaves dry more quickly than with nighttime watering. In addition, it is helpful to avoid working with plants when they are wet. Although resistance to Septoria leaf spot has been tentatively identified in several lines of tomato used for breeding, no cultivars with resistance are commercially available to date. Fungicides are very effective for control of Septoria leaf spot and applications are often necessary to supplement the control strategies previously outlined. The fungicides chlorothalonil and mancozeb are labeled for homeowner use. Since these are protectant materials, they should be applied as soon as symptoms are observed and repeated as necessary when conditions are favorable for disease development and spread. In Connecticut, the first sprays are usually needed by mid-July. The fungicide labels contain information on dosage rates, spray intervals, days-to-harvest intervals, and safety precautions.",
  "Tomato___Spider_mites Two-spotted_spider_mite": "N/A",
  "Tomato___Target_Spot": "N/A",
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Once infected with the virus, there are no treatments against the infection. Control the whitefly population to avoid the infection with the virus. Insecticides of the family of the pyrethroids used as soil drenches or spray during the seedling stage can reduce the population of whiteflies. However, their extensive use might promote resistance development in whitefly populations.<br/><br/>Preventive Measures<br/><br/>1. Use resistant or tolerant varieties.<br/><br/>2. Plant early to avoid peak populations of the whitefly.<br/><br/>3. Intercrop with rows of non-susceptible plants such as squash and cucumber.<br/><br/>4. Use nets to cover seedbeds and prevent whiteflies from  reaching plants.<br/><br/>5. Practice crop rotation with non-susceptible plants.<br/><br/>6. Avoid planting alternative host plants close to crops.<br/><br/>7. Mulch the seedbed or the field to break the life cycle of the whitefly.<br/><br/>8. Use sticky yellow plastic traps to mass-catch the insect.<br/><br/>9. Monitor the field, handpick diseased plants and bury them away from the field. <br/><br/>10. Find and eradicate weeds in and around the field.",
  "Tomato___Tomato_mosaic_virus": "N/A",
  "Tomato___healthy": "Your plant is not infected"
}


let progressBar = new ProgressBar.Circle("#progress", {
  color: "limegreen",
  strokeWidth: 10,
  duration: 2000, // milliseconds
  easing: "easeInOut",
});

async function fetchData() {
  let response = await fetch("./class_indices.json");
  let data = await response.json();
  data = JSON.stringify(data);
  data = JSON.parse(data);
  return data;
}

// here the data will be return.

// Initialize/Load model
async function initialize() {
  let status = document.querySelector(".init_status");
  status.innerHTML =
    'Loading Model .... <span class="fa fa-spinner fa-spin"></span>';
  model = await tf.loadLayersModel("./tensorflowjs-model/model.json");
  status.innerHTML =
    'Model Loaded Successfully  <span class="fa fa-check"></span>';
}

async function predict() {
  // Function for invoking prediction
  let img = document.getElementById("image");
  let offset = tf.scalar(255);
  let tensorImg = tf.browser
    .fromPixels(img)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .expandDims();
  let tensorImg_scaled = tensorImg.div(offset);
  prediction = await model.predict(tensorImg_scaled).data();

  fetchData().then((data) => {
    predicted_class = tf.argMax(prediction);

    class_idx = Array.from(predicted_class.dataSync())[0];
    document.querySelector(".pred_class").innerHTML = data[class_idx];
    document.querySelector(".inner").innerHTML = `${parseFloat(
      prediction[class_idx] * 100
    ).toFixed(2)}% SURE`;
    console.log(data);
    console.log(data[class_idx]);
    console.log(prediction);

    localStorage.setItem('disease', JSON.stringify(data[class_idx]));

    progressBar.animate(prediction[class_idx] - 0.005); // percent

    pconf.style.display = "block";

    confidence.innerHTML = Math.round(prediction[class_idx] * 100);

  });
}

function addDiseaseCure() {
  const disease = JSON.parse(localStorage.getItem('disease'));
  const cure = cureJSON[disease];
  const newDisease = document.createElement("p");
  newDisease.innerHTML = cure;
  document.getElementById("cureDetails").append(newDisease);
}

fileUpload.addEventListener("change", function (e) {
  let uploadedImage = e.target.value;
  if (uploadedImage) {
    document.getElementById("blankFile-1").innerHTML = uploadedImage.replace(
      "C:\\fakepath\\",
      ""
    );
    document.getElementById("choose-text-1").innerText =
      "Change Selected Image";
    document.querySelector(".success-1").style.display = "inline-block";

    let extension = uploadedImage.split(".")[1];
    if (!["doc", "docx", "pdf"].includes(extension)) {
      document.querySelector(".success-1 i").style.border =
        "1px solid limegreen";
      document.querySelector(".success-1 i").style.color = "limegreen";
    } else {
      document.querySelector(".success-1 i").style.border =
        "1px solid rgb(25,110,180)";
      document.querySelector(".success-1 i").style.color = "rgb(25,110,180)";
    }
  }
  let file = this.files[0];
  if (file) {
    boxResult.style.display = "block";
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", function () {
      img.style.display = "block";
      img.setAttribute("src", this.result);
    });
  } else {
    img.setAttribute("src", "");
  }

  initialize().then(() => {
    predict()
  });
});

