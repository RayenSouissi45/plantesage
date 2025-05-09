import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import placeholder from "../../assets/images/placeholderTree.png";

export default function HomeScreen(): JSX.Element {
  const [image, setImage] = useState<string | null>(null);

  const uploadImage = async (mode) => {
    console.log("pressed !");
    try {
      let result;
      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.back,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        console.log("Image URI:", result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const removeImage = () => setImage(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌳 Check Your Tree's Health</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => uploadImage("")}
        >
          <Text style={styles.buttonText}>📷 Use Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => uploadImage("gallery")}
        >
          <Text style={styles.buttonText}>🖼️ Choose from Gallery</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={image ? { uri: image } : placeholder}
          style={styles.image}
        />

        {image && (
          <TouchableOpacity style={styles.deleteButton} onPress={removeImage}>
            <Text style={styles.deleteText}>🗑️ Delete Image</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.analyzeButton}>
        <Text style={styles.analyzeText}>🔍 Analyze Tree</Text>
      </TouchableOpacity>

      <Text style={styles.feedbackText}>📝 Feedback will appear here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    color: "#2e2e2e",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  secondaryButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  image: {
    height: 240,
    width: 240,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
  analyzeButton: {
    backgroundColor: "#673AB7",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  analyzeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  feedbackText: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    color: "#666",
  },
});
