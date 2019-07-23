import React, { useState } from "react";
import _ from "lodash/fp";

import { EVENTS_ENDPOINT } from "../utils/constants";
import { construct, unshift } from "../utils/misc";
import { useResource, useTransform } from "../utils/hooks";
import { Input, Select } from "../ui";

import "./list.css";

const dateToString = date =>
  `${String(date.getDate()).padStart(2, "0")}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${date.getFullYear()}`;

const stringToDate = string =>
  string.split(".").reduce((date, item, index) => {
    if (index === 0) {
      date.setDate(item);
    } else if (index === 1) {
      date.setMonth(item);
    } else if (index === 2) {
      date.setFullYear(item);
    }
    return date;
  }, new Date());

export const EventsList = () => {
  const resource = useResource(EVENTS_ENDPOINT);

  const { data, loading } = useTransform(
    _.update("data", _.map(_.update("start", construct(Date)))),
    resource
  );

  const [filters, setFilters] = useState(() => ({
    location: "all",
    from: new Date(0)
  }));

  const locationOptions = useTransform(
    _.pipe(
      _.get("data"),
      _.map(_.prop("location")),
      _.uniq,
      _.map(location => ({ key: location, caption: location })),
      unshift({ key: "all", caption: "Все" })
    ),
    resource
  );

  if (!data) {
    return null;
  }

  return (
    <div className="section">
      <div className="section-content">
        <div className="ui-controls-group">
          <div className="ui-control" data-control-size="1/2">
            <Select
              label={"Фильтр по городам:"}
              options={locationOptions}
              value={filters.location}
              onChange={next => {
                console.log(next);
                setFilters(_.set("location", next));
              }}
            />
          </div>
          <div className="ui-control" data-control-size="1/2">
            <Input
              label={"Начиная с:"}
              value={dateToString(filters.from)}
              onChange={next => {
                setFilters(_.set("from", stringToDate(next)));
              }}
            />
          </div>
        </div>
        <table className="events-table mt-16">
          <thead>
            <tr>
              <th className="events-table-col" data-col-type="date">
                Дата
              </th>
              <th className="events-table-col" data-col-type="location">
                Город
              </th>
              <th className="events-table-col" data-col-type="summary">
                Событие
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter(
                _.allPass([
                  ({ location }) =>
                    console.log(filters.location, location) ||
                    filters.location === "all" ||
                    filters.location === location,
                  ({ start }) => filters.from <= start
                ])
              )
              .map(({ uid, start, location, summary, description }) => (
                <tr key={uid}>
                  <td className="events-table-col" data-col-type="date">
                    {dateToString(start)}
                  </td>
                  <td className="events-table-col" data-col-type="location">
                    {location}
                  </td>
                  <td className="events-table-col" data-col-type="summary">
                    <a href={description}>{summary}</a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
