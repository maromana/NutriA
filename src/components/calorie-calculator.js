import { useState } from "react";
import LoadingSpinner from "@/components/spinner";
import {AlertModal} from "@/components/model/alert";

// Defines the main component for the calorie calculator page
export const CalorieCalculatorPage = () => {
    // State hooks for managing various states
    const [uploadedImage, setUploadedImage] = useState(null);
    const [foodItems, setFoodItems] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const base64Image = await getBase64(file);
                setUploadedImage(base64Image); // Updates state with the base64 encoded image
                sendImageToServer(base64Image); // Sends the base64 encoded image to the server
            } catch (error) {
                console.error('Error reading file:', error);
            }
        }
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result); // Resolves the promise upon successful file read
            reader.onerror = error => reject(error); // Rejects the promise if file reading fails
            reader.readAsDataURL(file); // Reads the file as a base64 data URL
        });
    };

    // Component for uploading images
    const ImageUpload = ({ onUpload, uploadedImage }) => {
        return (
            <div className="text-center p-4">
                <input id="upload" type="file" accept="image/*" onChange={onUpload} className="hidden" />
                <div className="image-container h-[380px] md:h-[200px] lg:h-[380px] w-full bg-white rounded-lg overflow-hidden">
                    {uploadedImage && <img src={uploadedImage} alt="Uploaded Food" className="w-full h-full object-cover" />}
                </div>
            </div>
        );
    };

    // Sends the base64 encoded image to the server for processing
    const sendImageToServer = (base64Image) => {
        setLoading(true);
        fetch('/api/detect_food', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64Image }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setFoodItems(data.items);
                    setTotalCalories(data.count);
                } else {
                    setShowAlert(true);
                    setAlertMessage(data.message);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                // Show AlertModal on error
                setLoading(false);
                setShowAlert(true);
                setAlertMessage('Failed to analyze the image. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Closes the alert modal
    const closeAlertModal = () => setShowAlert(false);

    // Component displaying the result of food detection
    const FoodDetection = () => {
        if (foodItems.length === 0) {
            return <div className="md:flex-1 h-auto flex flex-col justify-between bg-base-100 rounded-box shadow">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-700 py-4">
                    Your food analysis report
                </h2>
            </div>;
        }

        return (
            <div className="md:flex-1 h-auto flex flex-col justify-between bg-base-100 rounded-box shadow">
                <div className="p-4">
                    <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-700">Ingredientes detectados</h2>
                    <div className="flex flex-wrap gap-2 justify-center items-center">
                        {foodItems.map((item, index) => (
                            <span key={index} className="badge badge-primary badge-outline p-4 text-sm md:text-base">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="py-4 px-4 text-center">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-700">Total Calorias:</h3>
                    <p className="text-2xl font-bold text-blue-600">{totalCalories} cal</p>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-2">
            {isLoading && (
                <LoadingSpinner />
            )}
            <div className="alert alert-info bg-blue-100 shadow-lg max-w-4xl w-full mb-4">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>This is a Free Online Tool.Please note that we use Google Gemini AI, which has a limit of 2 requests per minute. If you encounter any errors, please try again.</span>
                </div>
            </div>

            <div className="container max-w-4xl p-5 bg-base-100 shadow-xl rounded-lg">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-white">NutriA</h1>
                <label htmlFor="upload" className="btn btn-primary cursor-pointer mb-4">
                    Sube la imagen de tu comida
                </label>

                <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="flex-1">
                        <div className="image-upload-area border-2 border-dashed h-[380px] md:h-[200px] lg:h-[380px] border-gray-300 rounded-lg flex justify-center items-center relative text-center bg-white">
                            <ImageUpload onUpload={handleImageUpload} uploadedImage={uploadedImage} />
                            {!uploadedImage && (
                                <div className="absolute inset-0 flex flex-col justify-center items-center text-gray-500">
                                    <p>No image uploaded</p>
                                    <p className="mt-2">Your uploaded image will appear here</p>
                                </div>
                            )}
                        </div>
                    </div>



                    <FoodDetection />
                </div>
            </div>

            <FAQSection />

            <AlertModal show={showAlert} onClose={closeAlertModal} type="error" message={alertMessage} />
        </div>
    );
};




const FAQSection = () => {
    const faqs = [
        {
            question: "¿Como funciona NutriA?",
            answer: "La aplicación permite contar las calorias de tu comida mediante inteligencia artificial. Para acceder a esto, debes subir una imagen, y la IA analizará la imagen para identificar los alimentos y calcular las calorías totales.",
        },
        {
            question: "¿Qué tipo de imágenes puedo subir?",
            answer: "Puedes subir imágenes de cualquier comida, como frutas, verduras, platos cocinados, etc. Asegúrate de que la imagen sea clara y bien iluminada para obtener mejores resultados.",
        },
        {
            question: "¿Mide la cantidad de comida que subo?",
            answer: "La aplicación no mide la cantidad exacta de comida, pero intenta identificar los alimentos presentes en la imagen y estimar las calorías basándose en el tipo de alimentos detectados.",
        },
    ];

    return (
        <div className="mt-8">
            <div className="divider"></div>
            <h2 className="text-xl font-semibold mb-4 text-white">Preguntas Frecuentes</h2>
            {faqs.map((faq, index) => (
                <div key={index} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box mb-2">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title text-lg font-medium text-white">
                        {faq.question}
                    </div>
                    <div className="collapse-content text-base text-white">
                        <p>{faq.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
