// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?

const getAllDirectors = (arr) => arr.map((movie) => movie.director)

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

const howManyMovies = (arr) =>
  arr.filter(
    (movie) =>
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
  ).length

// Iteration 3: All rates average - Get the average of all rates with 2 decimals

const ratesAverage = (arr) =>
  parseFloat(
    (
      arr.reduce((total, movie) => (total += movie.rate || 0), 0) /
        arr.length || 0
    ).toFixed(2)
  )

// Iteration 4: Drama movies - Get the average of Drama Movies

const dramaMoviesRate = (arr) =>
  parseFloat(
    arr
      .filter((m) => m.genre.includes("Drama"))
      .reduce(
        (total, movie, i, l) =>
          (total += movie.rate || 0) / (l.length === i + 1 ? l.length : 1),
        0
      )
      .toFixed(2) || 0
  )

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

const orderByYear = (arr) => [
  ...arr.sort((a, b) =>
    a.year > b.year ? 1 : b.year > a.year ? -1 : a.title.localeCompare(b.title)
  ),
]

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

const orderAlphabetically = (arr) =>
  [...arr]
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(0, 20)
    .map((c) => c.title)

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

const turnHoursToMinutes = (moviesArr) => {
  let moves = moviesArr.map((movie) => {
    let movieCopy = Object.assign({}, movie)
    movieCopy.duration = movieCopy.duration
      .split(" ")
      .reduce(
        (t, s) =>
          (t += s.includes("h")
            ? parseInt(s.replace(/h/g, "")) * 60
            : parseInt(s.replace(/min/g, ""))),
        0
      )
    return movieCopy
  })
  return moves
}

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average

const bestYearAvg = (moviesArr) => {
  if (moviesArr.length === 0) return null

  const years = Array(...new Set(moviesArr.map((movie) => movie.year)))

  let yearObj = years.reduce(
    (bestYear, year) => {
      let thisYear = {
        year,
        avg: ratesAverage(moviesArr.filter((m) => m.year == year)),
      }
      return bestYear.avg === thisYear.avg
        ? (bestYear.year < thisYear.year && bestYear) || thisYear
        : bestYear.avg < thisYear.avg
        ? thisYear
        : bestYear
    },
    { year: undefined, avg: 0 }
  )

  return `The best year was ${yearObj.year} with an average rate of ${yearObj.avg}`
}
