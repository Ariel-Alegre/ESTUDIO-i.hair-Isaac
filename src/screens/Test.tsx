import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, Modal } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from 'axios';
import { Calendar, DateData } from 'react-native-calendars';

interface Employee {
  avatar: string;
  name: string;
  lastName: string;
  position: string;
}

interface CardData {
  id: string;
  nombre: string;
  direccion: string;
  imagen: string;
  tipo: string;
  precios: Array<{ categoria: string, servicio: string, precio: string }>;
  rating: number;
  horario: Array<{ apertura: string, cierre: string, dia: string, estado: string }>;
  Employees: Employee[];
}

const SalonDetails = () => {
  const route = useRoute();
  const { idBussiness } = route.params as { idBussiness: string };
  const navigation = useNavigation();
  
  const [businessDetails, setBusinessDetails] = useState<CardData | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showEmployeesModal, setShowEmployeesModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false); // Modal para horarios
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.2.111:3001/api/one-bussiness/${idBussiness}`);
        setBusinessDetails(response.data.data);
      } catch (error) {
        console.error('Error al obtener los negocios:', error);
      }
    };

    if (idBussiness) {
      fetchData();
    }
  }, [idBussiness]);

  if (!businessDetails) {
    return (
      <View style={{ margin: "auto", height: "auto" }}>
        <Text>Cargando detalles...</Text>
      </View>
    );
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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{businessDetails.nombre}</Text>
      <Text style={{ fontSize: 14, color: "gray", marginTop: 5 }}>{businessDetails.direccion}</Text>

      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: "black",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
        onPress={handleReserve}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Reservar</Text>
      </TouchableOpacity>

      {/* Modal de empleados */}
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
    </ScrollView>
  );
};

export default SalonDetails;
