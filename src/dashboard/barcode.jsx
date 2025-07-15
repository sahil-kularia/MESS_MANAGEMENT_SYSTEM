// this code is almost correct here i only require to get the api key of the side
// but this is a paid platform from which we get the original data of the product
// openfoodfact can be used to get the details of the product 
// buycott can also be used it also provide the scan date 



import React, { useEffect, useRef, useState } from "react";
import Quagga from "quagga";

export default function SimpleBarcodeScanner() {
  const [barcode, setBarcode] = useState("");
  const [productInfo, setProductInfo] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const scannerRef = useRef(null);

  const API_KEY = "YOUR_API_KEY_HERE"; // 🔐 Replace with your BarCodeLookup API key

  // Fetch product details from barcode
  const fetchProductDetails = async (barcode) => {
    try {
      const response = await fetch(
        `https://api.barcodelookup.com/v3/products?barcode=${barcode}&formatted=y&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.products && data.products.length > 0) {
        setProductInfo(data.products[0]);
      } else {
        setProductInfo({ title: "No product found." });
      }
    } catch (error) {
      console.error("Error fetching product info:", error);
      setProductInfo({ title: "Error fetching product info." });
    }
  };

  // Start camera-based scanning
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            facingMode: "environment",
          },
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "upc_reader",
            "upc_e_reader",
            "code_39_reader",
            "codabar_reader",
            "i2of5_reader",
          ],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error("Quagga init error:", err);
        } else {
          Quagga.start();
        }
      }
    );

    Quagga.onDetected(handleDetected);

    return () => {
      Quagga.offDetected(handleDetected);
      Quagga.stop();
    };
  }, []);

  // Handle detection
  const handleDetected = (result) => {
    const code = result.codeResult.code;
    setBarcode(code);
    fetchProductDetails(code); // 🔍 Fetch product info from API
    Quagga.stop();
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataURL = ev.target.result;
      setUploadedImage(dataURL);

      Quagga.decodeSingle(
        {
          src: dataURL,
          numOfWorkers: 0,
          decoder: {
            readers: [
              "code_128_reader",
              "ean_reader",
              "ean_8_reader",
              "upc_reader",
              "upc_e_reader",
              "code_39_reader",
              "codabar_reader",
              "i2of5_reader",
            ],
          },
          locate: false,
        },
        (result) => {
          if (result && result.codeResult) {
            setBarcode(result.codeResult.code);
            fetchProductDetails(result.codeResult.code); // 🔍
          } else {
            alert("No barcode detected. Try another image.");
          }
        }
      );
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📷 Barcode Scanner (Camera + Image Upload)</h2>

      <div
        ref={scannerRef}
        style={{
          width: "100%",
          maxWidth: 400,
          height: 250,
          border: "1px solid gray",
          marginBottom: 20,
          transform: "scaleX(-1)",
          overflow: "hidden",
        }}
      />

      <h4>Or Upload a Barcode Image:</h4>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploadedImage && (
        <img
          src={uploadedImage}
          alt="Uploaded barcode"
          style={{ maxWidth: 200, marginTop: 10 }}
        />
      )}

      {barcode && (
        <div style={{ marginTop: 20 }}>
          <h3>🔍 Detected Barcode:</h3>
          <code
            style={{
              fontSize: "1.2em",
              background: "#f4f4f4",
              padding: 10,
              display: "inline-block",
              wordBreak: "break-word",
            }}
          >
            {barcode}
          </code>
        </div>
      )}

      {productInfo && (
        <div style={{ marginTop: 20 }}>
          <h3>📦 Product Details</h3>
          <p><strong>Name:</strong> {productInfo.title}</p>
          <p><strong>Brand:</strong> {productInfo.brand}</p>
          <p><strong>Manufacturer:</strong> {productInfo.manufacturer}</p>
          {productInfo.images && productInfo.images[0] && (
            <img
              src={productInfo.images[0]}
              alt="Product"
              style={{ maxWidth: 200, marginTop: 10 }}
            />
          )}
        </div>
      )}
    </div>
  );
}
