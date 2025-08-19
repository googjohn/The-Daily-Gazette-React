import { useState, useEffect } from "react"

export default function WeatherApp() {
  useEffect(() => {

  }, [])
  return (
    <>
      <div id="weather-app" className="flex justify-end sticky top-20 z-10">
        <div id="weather-banner" className="relative text-black max-w-max h-10 py-[5px] px-[10px] rounded-lg shadow-(--bs-banner-1) hover:shadow-(--bs-banner-1-inset) flex justify-between items-center gap-2.5">
          <div className="current-location ">Pasig</div>
          <div className="current-condition-icon w-full h-full">
            <img src="https://googjohn.github.io/hosted-assets/weather-icons/png/PartlyCloudyNight.png" className="w-full h-full" alt="" />
          </div>
          <div className="current-temp"><span>32&deg;C</span></div>
          {/* <div className="dropdown">
            <i className="fa-solid fa-chevron-down"></i>
            <div className="forecast-container">
              <div className="forecast-item">
                <div className="current-location"></div>
                <div className="dropdown-inner">
                  <i className="fa-solid fa-ellipsis"></i>
                  <ul className="unit-container">
                    <li className="celcius">&deg;C Celcius</li>
                    <li className="fahrenheit">&deg;F Fahrenheit</li>
                    <li className="kelvin">&deg;K Kelvin</li>
                  </ul>
                </div>
              </div>
              <div className="forecast-item">
                <div className="icon-temp-container">
                  <div className="current-condition-icon"></div>
                  <div className="current-temp"></div>
                  <div className="weather-description">There will be scattered rain. Don't forget to bring umbrella!</div>
                </div>
              </div>
              <div className="forecast-item">
                <div className="hour-day-forecast">
                  <div className="hour-day-selection">
                    <div className="hour-tab active">Hourly</div>
                    <div className="day-tab">Daily</div>
                  </div>
                  <div className="hour-day-cards">
                    <div className="hourly-forecast">
                      <div className="hourly-item">
                        <span className="time">01PM</span>
                        <span className="icon">
                          <img src="https://googjohn.github.io/hosted-assets/weather-icons/png/PartlyCloudyNight.png" alt="" />
                        </span>
                        <span className="hourly-temp">24&deg;C</span>
                        <span className="precipitate">9%</span>
                      </div>
                      <div className="hourly-item">
                        <span className="time">01PM</span>
                        <span className="icon">
                          <img src="https://googjohn.github.io/hosted-assets/weather-icons/png/PartlyCloudyNight.png" alt="" />
                        </span>
                        <span className="hourly-temp">24&deg;C</span>
                        <span className="precipitate">9%</span>
                      </div>
                      <div className="hourly-item">
                        <span className="time">01PM</span>
                        <span className="icon">
                          <img src="https://googjohn.github.io/hosted-assets/weather-icons/png/PartlyCloudyNight.png" alt="" />
                        </span>
                        <span className="hourly-temp">24&deg;C</span>
                        <span className="precipitate">9%</span>
                      </div>
                      <div className="hourly-item">
                        <span className="time">01PM</span>
                        <span className="icon">
                          <img src="https://googjohn.github.io/hosted-assets/weather-icons/png/PartlyCloudyNight.png" alt="" />
                        </span>
                        <span className="hourly-temp">24&deg;C</span>
                        <span className="precipitate">9%</span>
                      </div>
                      <div className="hourly-item">
                        <span className="time">01PM</span>
                        <span className="icon">
                          <img src="https://googjohn.github.io/hosted-assets/weather-icons/png/PartlyCloudyNight.png" alt="" />
                        </span>
                        <span className="hourly-temp">24&deg;C</span>
                        <span className="precipitate">9%</span>
                      </div>
                    </div>
                    <div className="daily-forecast">
                      <div className="daily-item">
                        <span className="day">Today</span>
                        <span className="icon">
                          <img src="https://googjohn.github.io/hosted-assets/weather-icons/png/PartlyCloudyNight.png" alt="" />
                        </span>
                        <span className="daily-temp">24&deg;C</span>
                        <span className="precipitate">9%</span>
                      </div>
                      <div className="daily-item">
                        <span className="day">Tue</span>
                        <span className="icon">
                          <img src="https://googjohn.github.io/hosted-assets/weather-icons/png/PartlyCloudyNight.png" alt="" />
                        </span>
                        <span className="daily-temp">24&deg;C</span>
                        <span className="precipitate">9%</span>
                      </div>
                      <div className="daily-item">
                        <span className="day">Wed</span>
                        <span className="icon">
                          <img src="https://googjohn.github.io/hosted-assets/weather-icons/png/PartlyCloudyNight.png" alt="" />
                        </span>
                        <span className="daily-temp">24&deg;C</span>
                        <span className="precipitate">9%</span>
                      </div>
                      <div className="daily-item">
                        <span className="day">Thu</span>
                        <span className="icon">
                          <img src="https://googjohn.github.io/hosted-assets/weather-icons/png/PartlyCloudyNight.png" alt="" />
                        </span>
                        <span className="daily-temp">24&deg;C</span>
                        <span className="precipitate">9%</span>
                      </div>
                      <div className="daily-item">
                        <span className="day">Fri</span>
                        <span className="icon">
                          <img src="https://googjohn.github.io/hosted-assets/weather-icons/png/PartlyCloudyNight.png" alt="" />
                        </span>
                        <span className="daily-temp">24&deg;C</span>
                        <span className="precipitate">9%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="forecast-item">
                <div className="more-forecast">
                  <h3>See full forecast</h3>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}