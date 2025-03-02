import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Animated } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // Importa useNavigation
import axios from 'axios'; // Asegúrate de tener instalado axios
import { useRoute } from "@react-navigation/native";
interface CardData {
  id: string;
  nombre: string;
  direccion: string;
  imagen: string;
  tipo: string;
  precios: Array<{ categoria: string, servicio: string, precio: string }>; // O precios: { categoria: string }[]
  rating: number;
  horario: Array<{ apertura: string, cierre:string, dia:string, estado: string }>
  teams: Array<{ imagen: string, nombre: string, puesto: string }>
}

const SalonDetails = () => {
  const route = useRoute();
  const { idBussiness } = route.params as { idBussiness: string };

  const [selectedCategory, setSelectedCategory] = useState("Destacados");
  const navigation = useNavigation(); // Obtén el objeto de navegación
  const [businessDetails, setBusinessDetails] = useState<CardData | null>(null); // Cambié esto a null inicialmente
  console.log(businessDetails);

  const goBack = () => {
    navigation.goBack(); // Vuelve a la pantalla anterior
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://panel-estudio-production.up.railway.app/api/one-bussiness/${idBussiness}`);
        setBusinessDetails(response.data.data); // Aquí actualizas el estado con el negocio obtenido
      } catch (error) {
        console.error('Error al obtener los negocios:', error);
      }
    };

    if (idBussiness) {
      fetchData(); // Llama a fetchData solo si existe un ID
    }
  }, [idBussiness]);

  if (!businessDetails) {
    return (
      <View style={{margin: "auto", height:"auto"}}>
        <Text>Cargando detalles...</Text>
      </View>
    ); // Muestra un mensaje mientras esperas la respuesta
  }

  const handleShare = () => {
    console.log("Compartir");
    // Aquí puedes implementar la lógica para compartir el contenido
  };

  const handleFavorite = () => {
    console.log("Añadir a favoritos");
    // Aquí puedes implementar la lógica para añadir a favoritos
  };

  // Servicios según la categoría seleccionada



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
      {/*  
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
      </TouchableOpacity> */}

      {/* Botón de añadir a favoritos en la esquina superior derecha */}
      {/*  
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
      */}
      {/* Imagen de fondo */}
      <View >

        <Image
          source={{
            uri: businessDetails.imagen[0],
          }}
          style={{ width: "100%", height: 312 }}
        />
      </View>

      {/* Información del salón */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>{businessDetails.nombre}</Text>
        {/* <Text style={{ fontSize: 16, color: "gray" }}>4.7 ⭐ (40)</Text> */}
        <Text style={{ fontSize: 14, color: "gray", marginTop: 5 }}>{businessDetails.direccion}</Text>
        <Text style={{ fontSize: 14, color: "gray", marginTop: 5 }}>abre a las {businessDetails.horario[0].apertura} am</Text>
      </View>

      {/* Categorías de servicios */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 10 }}>
        {businessDetails?.precios.length > 0 ? (
          businessDetails?.precios.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={{
                marginRight: 10,
                padding: 8,
                borderRadius: 10,
                backgroundColor: selectedCategory === category.categoria ? 'black' : '#eee',
              }}
              onPress={() => setSelectedCategory(category.categoria)} // Cambia el estado al hacer clic
            >
              <Text style={{ color: selectedCategory === category.categoria ? 'white' : 'black' }}>
                {category.categoria} {/* Asegúrate de que la propiedad sea correcta */}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No hay categorías disponibles</Text>
        )}
      </View>
      {/* Servicios */}
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Servicios</Text>
        {businessDetails?.precios.map((service, index) => (
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
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{service.servicio}</Text>
              {/*  <Text style={{ fontSize: 14, color: "gray" }}>{service.duration}</Text> */}
              <Text style={{ fontSize: 14, color: "black", marginTop: 5 }}>desde ${service.precio}</Text>
            </View>
            <TouchableOpacity >
              <Text style={{ color: "white", backgroundColor: "black", padding: 10, borderRadius: 5 }}>Reservar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Sección de equipo */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>


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
            <Text style={{ color: "black", fontSize: 16, textDecorationLine: "underline" }}>Ver Todo</Text>
          </TouchableOpacity>
        </View>
        {/* Contenedor en filas de 3 */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {businessDetails.teams.slice(0, 6).map((member, index) => ( // Muestra solo los primeros 6
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
                source={{ uri: member.imagen }}
                style={{ width: 70, height: 70, borderRadius: 35, marginBottom: 5 }}
              />
              <Text style={{ fontSize: 14, fontWeight: "bold", textAlign: "center" }}>{member.nombre}</Text>
              <Text style={{ fontSize: 12, color: "gray", textAlign: "center" }}>{member.puesto}</Text>
            </View>
          ))}
        </View>


      </View>

      {/* Reseñas*/}
      {/*
<View style={{ paddingHorizontal: 20, marginTop: 20 }}>
  <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Reseñas</Text>

  {/* Contenedor de reseñas en filas de 2 
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
  </View> */}

      {/* Botón Ver Todo */}
      {/* <TouchableOpacity
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
 */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Horarios de Apertura</Text>

        {businessDetails.horario.map((horarios, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 16, color: 'black', flex: 1, }}>
            
            {horarios.dia}: {horarios.apertura} AM - {horarios.cierre} PM
            </Text> 

            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: horarios.estado === "abierto" ? 'green' : 'gray',
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
