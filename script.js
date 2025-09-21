document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('movie_id');

  if (movieId) {
    console.log('User wants to book tickets for Movie ID:', movieId);
    // Now you can use this ID to fetch movie data, showtimes, dates, etc.
    // fetchMovieShowtimes(movieId).then(data => {
    //   // Populate the dates, times, and seat map on the page
    // });
  }
});