import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cars/${id}`)
      .then((res) => {
        setCar(res.data);
        setLoading(false);
      })
      .catch(() => {
        setCar(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorCard}>
          <p style={styles.errorIcon}>⌛</p>
          <p style={styles.errorTitle}>Loading Car Details...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorCard}>
          <p style={styles.errorIcon}>🚗</p>
          <p style={styles.errorTitle}>Car Not Found</p>
          <button onClick={() => navigate("/cars")} style={styles.errorButton}>
            Back to Cars
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.vipRibbon}>Almadina Cars</div>
      <div style={styles.vipBadge}>PREMIUM</div>

      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>{car.name}</h1>
            <p style={styles.subtitle}>Luxury Edition</p>
          </div>
          <div style={styles.priceTag}>{car.rentPerDay} PKR/day</div>
        </div>

        <div style={styles.content}>
          <div style={styles.imageSection}>
            <div style={styles.mainImageContainer}>
              <img
                src={car.images?.[selectedImage] || "https://via.placeholder.com/600x400"}
                alt={car.name}
                style={styles.mainImage}
              />
            </div>
            <div style={styles.thumbnailContainer}>
              {car.images?.map((img, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.thumbnail,
                    border:
                      selectedImage === index
                        ? "3px solid #d4af37"
                        : "1px solid #e0e0e0",
                    transform: selectedImage === index ? "scale(1.05)" : "scale(1)",
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`View ${index + 1}`} style={styles.thumbnailImage} />
                </div>
              ))}
            </div>
          </div>

          <div style={styles.detailsSection}>
            <div style={styles.specsCard}>
              <h2 style={styles.specsTitle}>Specifications</h2>
              <div style={styles.specGrid}>
                <div style={styles.specItem}>
                  <span style={styles.specLabel}>Model:</span>
                  <span style={styles.specValue}>{car.model}</span>
                </div>
                <div style={styles.specItem}>
                  <span style={styles.specLabel}>Fuel Efficiency:</span>
                  <span style={styles.specValue}>{car.fuelAverage}</span>
                </div>
                <div style={styles.specItem}>
                  <span style={styles.specLabel}>AC:</span>
                  <span style={styles.specValue}>{car.airConditioned ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>

            <div style={styles.featuresCard}>
              <h2 style={styles.featuresTitle}>Premium Features</h2>
              <ul style={styles.featuresList}>
                <li style={styles.featureItem}>Leather Seats</li>
                <li style={styles.featureItem}>Premium Sound System</li>
                <li style={styles.featureItem}>360° Camera</li>
                <li style={styles.featureItem}>Panoramic Sunroof</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={styles.actionButtons}>
          <button onClick={() => navigate(-1)} style={styles.backButton}>
            ← Explore Other Cars
          </button>
          <button
            onClick={() => navigate("/booking", { state: { carId: car._id } })}
            style={styles.bookButton}
          >
            Select →
          </button>
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  vipRibbon: {
    position: "absolute",
    top: "30px",
    left: "-50px",
    background: "linear-gradient(90deg, #ffd700, #ffec8b, #ffd700)",
    color: "#8b7500",
    padding: "12px 70px",
    fontWeight: "bold",
    fontSize: "16px",
    transform: "rotate(-45deg)",
    boxShadow: "0 2px 15px rgba(0,0,0,0.3)",
    zIndex: 10,
    textTransform: "uppercase",
    letterSpacing: "2px"
  },
  vipBadge: {
    position: "absolute",
    top: "30px",
    right: "30px",
    background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
    color: "#ffd700",
    padding: "8px 20px",
    borderRadius: "30px",
    fontWeight: "bold",
    fontSize: "14px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    border: "2px solid #d4af37",
    zIndex: 10
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    width: "90%",
    maxWidth: "1100px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
    overflow: "hidden",
    border: "3px solid #d4af37",
    position: "relative",
    zIndex: 1
  },
  header: {
    background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
    color: "white",
    padding: "25px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "3px solid #d4af37"
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    margin: "0",
    color: "#ffd700",
    letterSpacing: "1px"
  },
  subtitle: {
    fontSize: "16px",
    margin: "5px 0 0",
    color: "rgba(255,255,255,0.8)",
    fontStyle: "italic"
  },
  priceTag: {
    background: "#d4af37",
    color: "#1a1a2e",
    padding: "10px 20px",
    borderRadius: "30px",
    fontWeight: "bold",
    fontSize: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
  },
  content: {
    display: "flex",
    flexDirection: ["column", "row"],
    padding: "30px",
    gap: "30px"
  },
  imageSection: {
    flex: 1,
    minWidth: "300px"
  },
  mainImageContainer: {
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    aspectRatio: "16/9",
    position: "relative",
    background: "#f5f5f5"
  },
  mainImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease"
  },
  thumbnailContainer: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
    overflowX: "auto",
    paddingBottom: "10px"
  },
  thumbnail: {
    width: "80px",
    height: "60px",
    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
    flexShrink: 0,
    background: "#f5f5f5"
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  detailsSection: {
    flex: 1,
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  specsCard: {
    background: "#f9f9f9",
    borderRadius: "15px",
    padding: "25px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    border: "1px solid #e0e0e0"
  },
  specsTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#1a1a2e",
    margin: "0 0 20px",
    paddingBottom: "10px",
    borderBottom: "2px solid #d4af37"
  },
  specGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },
  specItem: {
    display: "flex",
    flexDirection: "column"
  },
  specLabel: {
    fontSize: "14px",
    color: "#666",
    fontWeight: "500",
    marginBottom: "5px"
  },
  specValue: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1a1a2e"
  },
  featuresCard: {
    background: "#f9f9f9",
    borderRadius: "15px",
    padding: "25px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    border: "1px solid #e0e0e0",
    flex: 1
  },
  featuresTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#1a1a2e",
    margin: "0 0 20px",
    paddingBottom: "10px",
    borderBottom: "2px solid #d4af37"
  },
  featuresList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  featureItem: {
    padding: "10px 0",
    borderBottom: "1px dashed #ddd",
    fontSize: "16px",
    color: "#444",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  actionButtons: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 30px",
    borderTop: "2px solid #f0f0f0",
    background: "#f9f9f9"
  },
  backButton: {
    background: "none",
    border: "2px solid #1a1a2e",
    color: "#1a1a2e",
    padding: "12px 25px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "16px"
  },
  bookButton: {
    background: "linear-gradient(135deg, #d4af37, #f1c40f)",
    border: "none",
    color: "#1a1a2e",
    padding: "12px 30px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
  },
  errorContainer: {
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },
  errorCard: {
    background: "#fff",
    borderRadius: "15px",
    padding: "40px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    width: "100%"
  },
  errorIcon: {
    fontSize: "50px",
    marginBottom: "20px"
  },
  errorTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#d32f2f",
    marginBottom: "20px"
  },
  errorButton: {
    background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
    color: "white",
    border: "none",
    padding: "12px 30px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px"
  }
};

export default CarDetails;
