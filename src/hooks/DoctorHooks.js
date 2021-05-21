import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const useDoctorHooks = (doctorId) => {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    async function fetchDoctors() {
      setLoading(true);
      const { data } = await axios.get(
        "https://tech-test.joovence.dev/api/doctors"
      );
      setDoctors(data);
      if (doctorId) {
        setDoctor(data.find(({ id }) => id === doctorId));
      }
      setLoading(false);
    }
    fetchDoctors();
  }, [doctorId]);
  return { loading, doctors, doctor };
};
const useAvailabilities = (doctorId) => {
  const [availabilities, setAvailabilities] = useState([]);
  const [displayedAvailabilities, setDisplayedAvailabilities] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  useEffect(() => {
    async function fetchAvailabilities() {
      const { data: dates } = await axios.get(
        `https://tech-test.joovence.dev/api/availabilities?doctorId=${doctorId}`
      );
      const sortedDates = dates.sort(({ start: start1 }, { start: start2 }) =>
        dayjs(start1).isAfter(start2) ? -1 : 1
      );
      setAvailabilities(sortedDates);
      setDisplayedAvailabilities(sortedDates.slice(0, 4));
    }
    fetchAvailabilities();
  }, [doctorId]);
  const onLoadMoreClick = () => {
    if (!loadMore) {
      setDisplayedAvailabilities(availabilities);
    } else {
      setDisplayedAvailabilities(availabilities.slice(0, 3));
    }
    setLoadMore(!loadMore);
  };
  return { displayedAvailabilities, loadMore, onLoadMoreClick };
};
export { useDoctorHooks, useAvailabilities };
