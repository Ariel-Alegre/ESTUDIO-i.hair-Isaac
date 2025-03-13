import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, Modal } from "react-native";

import MapView, { Marker } from 'react-native-maps';
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // Importa useNavigation
import axios from 'axios'; // Asegúrate de tener instalado axios
import { useRoute } from "@react-navigation/native";
import { Calendar, DateData } from 'react-native-calendars';

interface CardData {
  id: string;
  nombre: string;
  direccion: string;
  imagen: string;
  tipo: string;
  precios: Array<{ categoria: string, servicio: string, precio: string }>; // O precios: { categoria: string }[]
  rating: number;
  horario: Array<{ apertura: string, cierre:string, dia:string, estado: string }>
  Employees: Array<{ avatar: string, name: string, lastName: string, position: string }>

  
}
interface Employee {
  avatar: string;
  name: string;
  lastName: string;
  position: string;
}
const SalonDetails = () => {
  const route = useRoute();
  const { idBussiness } = route.params as { idBussiness: string };

  const [selectedCategory, setSelectedCategory] = useState("Destacados");
  const navigation = useNavigation(); // Obtén el objeto de navegación
  const [businessDetails, setBusinessDetails] = useState<CardData | null>(null); // Cambié esto a null inicialmente
     const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [showEmployeesModal, setShowEmployeesModal] = useState(false);
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [showTimeModal, setShowTimeModal] = useState(false); // Modal para horarios
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [availableHours, setAvailableHours] = useState<string[]>([]);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);
  
  
  console.log(businessDetails);

  const goBack = () => {
    navigation.goBack(); // Vuelve a la pantalla anterior
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.2.111:3001/api/one-bussiness/${idBussiness}`);
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

 const handleReserve = () => {
     setShowEmployeesModal(true); // Mostrar modal de empleados
     setShowCalendarModal(false); // Ocultar modal de calendario
     setAvailableHours([]); // Limpiar horarios disponibles
   };
 
   const selectEmployee = (employee: Employee) => {
     setSelectedEmployee(employee);
     setShowEmployeesModal(false); // Cerrar modal de empleados
     setShowCalendarModal(true); // Mostrar modal de calendario
   };
 
   const onDayPress = (day: DateData) => {
     setSelectedDate(day.dateString);
     setSelectedHour(null); // Reiniciar selección de horario
     
     // Obtener el día de la semana seleccionado
     const dayOfWeek = new Date(day.dateString).getDay();
     const weekDays = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
     const selectedDay = weekDays[dayOfWeek];
 
     // Buscar el horario correspondiente
     const businessDay = businessDetails.horario.find(h => h.dia.toLowerCase() === selectedDay.toLowerCase());
 
     if (businessDay && businessDay.estado.toLowerCase() === "abierto") {
       const hours = generateAvailableHours(businessDay.apertura, businessDay.cierre);
       setAvailableHours(hours);
       setShowTimeModal(true); // Mostrar modal de horarios
     } else {
       setAvailableHours([]);
     }
 
     // Cerrar el modal de calendario después de seleccionar una fecha
     setShowCalendarModal(false);
   };
 
   const generateAvailableHours = (start: string, end: string) => {
     let times = [];
     let [startHour, startMinute] = start.split(":").map(Number);
     let [endHour, endMinute] = end.split(":").map(Number);
 
     while (startHour < endHour || (startHour === endHour && startMinute < endMinute)) {
       let formattedHour = `${String(startHour).padStart(2, "0")}:${String(startMinute).padStart(2, "0")}`;
       times.push(formattedHour);
 
       startMinute += 30; // Intervalo de 30 minutos
       if (startMinute >= 60) {
         startMinute = 0;
         startHour += 1;
       }
     }
     return times;
   };
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
              <Text style={{ color: "white", backgroundColor: "black", padding: 10, borderRadius: 5 }} onPress={handleReserve}  >Reservar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Sección de modal */}

   <Modal
        visible={showEmployeesModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEmployeesModal(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: 300, backgroundColor: "white", padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Selecciona un empleado</Text>
            <FlatList
              data={businessDetails.Employees}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    borderBottomWidth: 1,
                    borderColor: "#ccc",
                  }}
                  onPress={() => selectEmployee(item)}
                >
                  <Image
                    source={{ uri: item.avatar }}
                    style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                  />
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name} {item.lastName}</Text>
                    <Text style={{ fontSize: 14, color: "gray" }}>{item.position}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Modal de calendario */}
      <Modal
        visible={showCalendarModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCalendarModal(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: 300, backgroundColor: "white", padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Selecciona una fecha para tu cita con {selectedEmployee?.name}
            </Text>
            <Calendar
              onDayPress={onDayPress}
              markedDates={selectedDate ? { [selectedDate]: { selected: true, selectedColor: "black" } } : {}}
            />
          </View>
        </View>
      </Modal>

      {/* Modal de selección de horario */}
      <Modal
        visible={showTimeModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTimeModal(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: 300, backgroundColor: "white", padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Selecciona un horario</Text>
            {availableHours.length > 0 ? (
              <FlatList
                data={availableHours}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      margin: 5,
                      borderRadius: 8,
                      backgroundColor: selectedHour === item ? "black" : "#ccc",
                    }}
                    onPress={() => setSelectedHour(item)}
                  >
                    <Text style={{ color: selectedHour === item ? "white" : "black" }}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text style={{ fontSize: 16, color: "red" }}>No hay horarios disponibles para este día.</Text>
            )}
          </View>
        </View>
      </Modal>
      {/* Sección de equipo */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>


          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Nuestro Equipo</Text>
          {/* Botón Ver Todo */}
      {/*     <TouchableOpacity
            style={{
              marginTop: 10,
              borderRadius: 10,
              alignItems: "center",
            }}
            onPress={() => console.log("Ver todo presionado")} // Aquí puedes abrir una pantalla nueva
          >
            <Text style={{ color: "black", fontSize: 16, textDecorationLine: "underline" }}>Ver Todo</Text>
          </TouchableOpacity> */}
        </View>
        {/* Contenedor en filas de 3 */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {businessDetails.Employees.slice(0, 6).map((member, index) => ( // Muestra solo los primeros 6
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
                source={{ uri: member.avatar }}
                style={{ width: 70, height: 70, borderRadius: 35, marginBottom: 5 }}
              />
              <Text style={{ fontSize: 14, fontWeight: "bold", textAlign: "center" }}>{member.name} {member.lastName}</Text>
              <Text style={{ fontSize: 12, color: "gray", textAlign: "center" }}>{member.position}</Text>
            </View>
          ))}
        </View>


      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Horarios de Apertura</Text>

        {businessDetails.horario.map((horarios, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
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
