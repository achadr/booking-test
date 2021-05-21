import { useState } from "react";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs"

const useBooking = (doctor) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [chosenDate, setChosenDate] = useState(undefined);
  const bookingAction = async (date) => {
    setLoading(true);
    // Impossible d'avoir une réponse depuis mon browser à cause des problèmes de cors coté serveur, même si je setup les headers http
    //const { data: reservation} = await axios.post("https://tech-test.joovence.dev/api/bookings" , {doctorId: doctor.id,date}, { headers: {"Access-Control-Allow-Origin": "*"}})
    setLoading(false);
    setChosenDate(date);
    const reservation = {
      id: "8e3f9d37-822b-47bc-90f4-b27e78e6d36d",
      doctorId: doctor.id,
      date: date,
      createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      updatedAt: "2021-05-21T14:31:03.516Z",
    };
    history.push(
      `/bookings?doctor=${btoa(JSON.stringify(doctor))}&&reservation=${btoa(
        JSON.stringify(reservation)
      )}`
    );
  };
  return { bookingAction, loading, chosenDate };
};

export { useBooking };
