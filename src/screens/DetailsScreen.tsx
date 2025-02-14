import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Animated   } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // Importa useNavigation
const SalonDetails = () => {
  const [selectedCategory, setSelectedCategory] = useState("Destacados");
  const navigation = useNavigation(); // Obtén el objeto de navegación
  
  const goBack = () => {
    navigation.goBack(); // Vuelve a la pantalla anterior
  };

  const handleShare = () => {
    console.log("Compartir");
    // Aquí puedes implementar la lógica para compartir el contenido
  };

  const handleFavorite = () => {
    console.log("Añadir a favoritos");
    // Aquí puedes implementar la lógica para añadir a favoritos
  };

  // Servicios según la categoría seleccionada

  const servicesByCategory = {
    Destacados: [
      { name: "Manicure Natural", duration: "15 min - 25 min", price: "US$ 8" },
      { name: "Corte de Cabello", duration: "30 min", price: "US$ 12" },
    ],
    PROMOS: [
      { name: "Peinado + Maquillaje", duration: "45 min", price: "US$ 20" },
      { name: "Combo Manicure + Pedicure", duration: "1h", price: "US$ 15" },
    ],
    Rostro: [
      { name: "Limpieza Facial", duration: "45 min", price: "US$ 18" },
      { name: "Depilación de Cejas", duration: "20 min", price: "US$ 5" },
    ],
    Cabello: [
      { name: "Tinte Completo", duration: "1h 30min", price: "US$ 30" },
      { name: "Tratamiento Capilar", duration: "45 min", price: "US$ 25" },
    ],
  };

  // Equipo del salón
  const teamMembers = [
    { name: "Ana Pérez", role: "Estilista", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcUef7cWD3uLU_G3k7Zbab66K4XFHObja2kw&s" },
    { name: "Carlos Gómez", role: "Barbero", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcUef7cWD3uLU_G3k7Zbab66K4XFHObja2kw&s" },
    { name: "María Torres", role: "Maquilladora", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcUef7cWD3uLU_G3k7Zbab66K4XFHObja2kw&s" },
  ];
  const reviews = [
    { name: "Ana López", rating: 5, comment: "Excelente servicio y atención. ¡Volveré!", image: "https://randomuser.me/api/portraits/women/1.jpg" },
    { name: "Carlos Pérez", rating: 4, comment: "Muy buen lugar, aunque podría mejorar un poco el ambiente.", image: "https://randomuser.me/api/portraits/men/2.jpg" },
    { name: "María Rodríguez", rating: 5, comment: "Los mejores en lo que hacen. Súper recomendados.", image: "https://randomuser.me/api/portraits/women/3.jpg" },
    { name: "Jorge Fernández", rating: 3, comment: "El servicio fue bueno, pero hubo demora en la atención.", image: "https://randomuser.me/api/portraits/men/4.jpg" }
  ];
  const horarios = [
    { dia: 'Lunes', abierto: true, hora: '9:00 AM - 10:00 PM' },
    { dia: 'Martes', abierto: true, hora: '9:00 AM - 10:00 PM' },
    { dia: 'Miércoles', abierto: true, hora: '9:00 AM - 10:00 PM' },
    { dia: 'Jueves', abierto: true, hora: '9:00 AM - 10:00 PM' },
    { dia: 'Viernes', abierto: true, hora: '9:00 AM - 10:00 PM' },
    { dia: 'Sábado', abierto: false, hora: '10:00 AM - 12:00 AM' },
    { dia: 'Domingo', abierto: false, hora: 'Cerrado' },
  ];

  const region = {
    latitude: 40.748817, // Latitud de ejemplo (cambia esto por la ubicación real)
    longitude: -73.985428, // Longitud de ejemplo (cambia esto por la ubicación real)
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };


  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
          <TouchableOpacity
        style={{
          position: "absolute",
          top: 80,
          left: 20,
          zIndex: 1, // Asegura que el botón esté encima de la imagen
          backgroundColor: "white",
          borderRadius: 100,
          padding: 5,
        }}
        onPress={goBack}
      >
        <Icon name="arrow-back" size={20} color="grey" />
      </TouchableOpacity>

      {/* Botón de compartir en la esquina superior derecha */}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 80,
          right: 60, // Ajusta la posición hacia la derecha
          zIndex: 1,
          backgroundColor: "white",
          borderRadius: 100,
          padding: 5,
        }}
        onPress={handleShare}
      >
        <Icon name="share-social" size={20} color="grey" />
      </TouchableOpacity>

           {/* Botón de añadir a favoritos en la esquina superior derecha */}
           <TouchableOpacity
        style={{
          position: "absolute",
          top: 80,
          right: 20, // Ajusta la posición hacia la derecha
          zIndex: 1,
          backgroundColor: "white",
          borderRadius: 100,
          padding: 5,
        }}
        onPress={handleFavorite}
      >
        <Icon name="heart" size={20} color="grey" />
      </TouchableOpacity>
      {/* Imagen de fondo */}
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcUef7cWD3uLU_G3k7Zbab66K4XFHObja2kw&s",
        }}
        style={{ width: "100%", height: 312 }}
      />

      {/* Información del salón */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>OKO - Belleza con Propósito</Text>
        <Text style={{ fontSize: 16, color: "gray" }}>4.7 ⭐ (40)</Text>
        <Text style={{ fontSize: 14, color: "gray", marginTop: 5 }}>{">"}50 km • Puembo, Quito</Text>
        <Text style={{ fontSize: 14, color: "gray", marginTop: 5 }}>Cerrado, abre pronto a las 8:00 a.m.</Text>
      </View>

      {/* Categorías de servicios */}
      <View style={{ flexDirection: "row", paddingHorizontal: 20, marginBottom: 10 }}>
        {["Destacados", "PROMOS", "Rostro", "Cabello"].map((category, index) => (
          <TouchableOpacity
            key={index}
            style={{
              marginRight: 10,
              padding: 8,
              borderRadius: 10,
              backgroundColor: selectedCategory === category ? "black" : "#eee",
            }}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={{ color: selectedCategory === category ? "white" : "black" }}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Servicios */}
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Servicios</Text>
        {servicesByCategory[selectedCategory].map((service, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 15,
              borderRadius: 10,
              backgroundColor: "#f9f9f9",
              marginBottom: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{service.name}</Text>
              <Text style={{ fontSize: 14, color: "gray" }}>{service.duration}</Text>
              <Text style={{ fontSize: 14, color: "black", marginTop: 5 }}>desde {service.price}</Text>
            </View>
            <TouchableOpacity >
              <Text style={{ color: "white", backgroundColor: "black", padding: 10, borderRadius: 5  }}>Reservar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Sección de equipo */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
      <View  style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>


  <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Nuestro Equipo</Text>
  {/* Botón Ver Todo */}
  <TouchableOpacity 
    style={{
        marginTop: 10,
        borderRadius: 10,
        alignItems: "center",
    }}
    onPress={() => console.log("Ver todo presionado")} // Aquí puedes abrir una pantalla nueva
    >
    <Text style={{ color: "black", fontSize: 16 , textDecorationLine: "underline"}}>Ver Todo</Text>
  </TouchableOpacity>
</View>
  {/* Contenedor en filas de 3 */}
  <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
    {teamMembers.slice(0, 6).map((member, index) => ( // Muestra solo los primeros 6
      <View
        key={index}
        style={{
          width: "32%",
          alignItems: "center",
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Image
          source={{ uri: member.image }}
          style={{ width: 70, height: 70, borderRadius: 35, marginBottom: 5 }}
        />
        <Text style={{ fontSize: 14, fontWeight: "bold", textAlign: "center" }}>{member.name}</Text>
        <Text style={{ fontSize: 12, color: "gray", textAlign: "center" }}>{member.role}</Text>
      </View>
    ))}
  </View>


</View>

  {/* Reseñas*/}

<View style={{ paddingHorizontal: 20, marginTop: 20 }}>
  <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Reseñas</Text>

  {/* Contenedor de reseñas en filas de 2 */}
  <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
    {reviews.slice(0, 4).map((review, index) => ( // Muestra solo las primeras 4
      <View
        key={index}
        style={{
          width: "48%",
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#f9f9f9",
          marginBottom: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
          <Image
            source={{ uri: review.image }}
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 8 }}
          />
          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>{review.name}</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>{'⭐'.repeat(review.rating)}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 12, color: "black" }} numberOfLines={3}>{review.comment}</Text>
      </View>
    ))}
  </View>

  {/* Botón Ver Todo */}
  <TouchableOpacity
  style={{
    marginTop: 10,
    backgroundColor: "white",  // Fondo blanco
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 0.5,  // Borde de 2 píxeles
    borderColor: "black"  // Color del borde negro
  }}
  onPress={() => console.log("Ver todas las reseñas")} // Aquí puedes abrir una pantalla nueva
>
  <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>Ver todo</Text>
</TouchableOpacity>

</View>
<View style={{ paddingHorizontal: 20, marginTop: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Horarios de Apertura</Text>

      {horarios.map((horario, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ fontSize: 16, color: 'black', flex: 1 }}>
            {horario.dia}: {horario.hora}
          </Text>
          
          <View 
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: horario.abierto ? 'green' : 'gray',
              marginLeft: 10
            }}
          />
        </View>
      ))}
    </View>

    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Información Adicional</Text>
      
      <Text style={{ fontSize: 16, color: 'black', marginBottom: 10 }}>
        Dirección: Calle Ficticia 123, Ciudad, País
      </Text>
      
      <Text style={{ fontSize: 16, color: 'black', marginBottom: 20 }}>
        Nuestro restaurante está ubicado en una zona céntrica de la ciudad, de fácil acceso y cerca de los principales puntos de interés. 
        Te esperamos para ofrecerte la mejor experiencia gastronómica.
      </Text>

      {/* Mapa con la ubicación del restaurante */}
      <MapView
        style={{ height: 250, width: '100%' }}
        initialRegion={region}
      >
        <Marker coordinate={region} title="Restaurante" description="Aquí estamos." />
      </MapView>
    </View>
      {/* Botón de reservar */}
      <View style={{ padding: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Reservar ahora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SalonDetails;
