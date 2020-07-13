import React from "react";
import App from "./App";
import { render, fireEvent, findByText } from "@testing-library/react";
import { fetchShow as mockFetchShow } from "./api/fetchShow";

jest.mock("./api/fetchShow");

test("App fetches API data and renders it", async () => {
  mockFetchShow.mockResolvedValueOnce(mockShow);
  const { findByText } = render(<App />);
  const menu = findByText(/select a season/i);
});

test("App fetchs data and renders appropriately", async () => {
  mockFetchShow.mockResolvedValueOnce(mockShow);

  const { getByText, getAllByText, queryAllByText } = render(<App />);

  await (() => {
    getByText(/Select a season/i);
  });

  expect(queryAllByText(/episode/i)).toHaveLength(0);

  fireEvent.mouseDown(getByText(/Select a season/i));
  expect(getAllByText(/season/i)).toHaveLength(2);

  fireEvent.mouseDown(getByText(/season 1/i));
  expect(getAllByText(/episode/i)).toHaveLength(2);
});

// Mock data
const mockShow = {
  image: {
    medium:
      "http://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg",
    original:
      "http://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg",
  },
  summary:
    "<p>A love letter to the '80s classics that captivated a generation, <b>Stranger Things</b> is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.</p>",
  _embedded: {
    episodes: [
      {
        id: 553946,
        url:
          "http://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
        name: "Chapter One: The Vanishing of Will Byers",
        season: 1,
        number: 1,
        airdate: "2016-07-15",
        airtime: "",
        airstamp: "2016-07-15T12:00:00+00:00",
        runtime: 60,
        image: {
          medium:
            "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
          original:
            "http://static.tvmaze.com/uploads/images/original_untouched/67/168918.jpg",
        },
        summary:
          "<p>A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.</p>",
        _links: {
          self: {
            href: "http://api.tvmaze.com/episodes/553946",
          },
        },
      },
      {
        id: 578663,
        url:
          "http://www.tvmaze.com/episodes/578663/stranger-things-1x02-chapter-two-the-weirdo-on-maple-street",
        name: "Chapter Two: The Weirdo on Maple Street",
        season: 1,
        number: 2,
        airdate: "2016-07-15",
        airtime: "",
        airstamp: "2016-07-15T12:00:00+00:00",
        runtime: 60,
        image: {
          medium:
            "http://static.tvmaze.com/uploads/images/medium_landscape/72/181376.jpg",
          original:
            "http://static.tvmaze.com/uploads/images/original_untouched/72/181376.jpg",
        },
        summary:
          "<p>While the search for the missing Will continues, Joyce tells Jim about a call she apparently received from her son. Meanwhile, Jane warns Mike that there are bad people after her, and he realizes that she knows what happened to Will.</p>",
        _links: {
          self: {
            href: "http://api.tvmaze.com/episodes/578663",
          },
        },
      },
    ],
  },
};
