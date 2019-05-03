import ReactDOM from "react-dom";
import React from "react";
import _ from "lodash/fp";

import "babel-polyfill";

const method = (propName, ...args) => object => object[propName](...args);

const methodOf = (object, propName) => (...args) => object[propName](...args);

const pipeP = (...fns) => async (...args) => {
  let result;
  for (const fn of fns) {
    result = await fn(...args);
    args = [result];
  }
  return result;
};

const EVENTS_ENDPOINT =
  "https://api.github.com/repos/web-standards-ru/calendar/contents/events";

const App = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    pipeP(
      fetch,
      method("json"),
      _.map(
        pipeP(
          _.prop("download_url"),
          fetch,
          method("text"),
          _.trim,
          _.split("\n"),
          _.map(_.split(": ")),
          _.fromPairs
        )
      ),
      methodOf(Promise, "all"),
      setEvents
    )(EVENTS_ENDPOINT);
  }, []);

  return (
    <div>
      <h1>Список событий</h1>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Город</th>
            <th>Имя</th>
            <th>Ссылка</th>
          </tr>
        </thead>
        <tbody>
          {events.map(({ name, date, city, link }) => (
            <tr key={date + city + name}>
              <td>{date}</td>
              <td>{city}</td>
              <td>{name}</td>
              <td>
                <a href={link}>{link}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const root = document.getElementById("app-root");

ReactDOM.render(<App />, root);
