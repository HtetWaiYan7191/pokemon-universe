/*  eslint-disable no-unused-vars */
const createReservations = (reserveContainer, reserveStore) => {
  reserveStore.forEach((reserve, id) => {
    const listElement = document.createElement('li');
    const reserveCount = document.getElementById('reserve-count');
    reserveCount.textContent = `${reserveStore.length}`;
    listElement.innerHTML = `Start Date - ${reserve.date_start} || End Date - ${reserve.date_end} By ${reserve.username}`;
    reserveContainer.appendChild(listElement);
  });
};

export default createReservations;