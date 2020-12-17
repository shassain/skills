import React, { Component } from 'react';
import Chess from '../views/Chess'
import Paddle from '../views/Paddle'
import Strings from '../views/Strings'
import Home from '../views/Home'

const URL = "/skills/public";
export const routeList = [
  {
    id: 0,
    exact: true,
    url: URL + "/",
    main: () => <Home />,
  },
  {
    id: 1,
    exact: true,
    url: URL + "/problema-1",
    main: () => <Paddle />,
  },
  {
    id: 2,
    exact: true,
    url: URL + "/problema-2",
    main: () => <Chess />,
  },
  {
    id: 3,
    exact: true,
    url: URL + "/problema-3",
    main: () => <Strings />,
  }
];
export const cardList = [
  {
    id: 1,
    label: "Liga de Padel",
    text: "Los organizadores de las ligas de pádel de Hill Valley no conocen los ordenadores, de manera que siguen anotando los resultados de cada enfrentamiento en un cuaderno, algo increíble teniendo en cuenta que las ligas que manejan pueden tener hasta 2000 par...",
    icon: "fa fa-gamepad",
    url: URL + "/problema-1",
  },
  {
    id: 2,
    text: "A queen is standing on an n x n chessboard. The chess board's rows are numbered from 1 to n, going from bottom to top. Its columns are numbered from 1 to n, going from left to right. Each square is referenced by a tuple, (r, c) , describing the row, r, and col...",
    label: "Chess",
    icon: "fa fa-bolt",
    url: URL + "/problema-2",
  },
  {
    id: 3,
    text: "Jane loves strings more than anything.She has a string t with her, and value of string s over function f can be calculated as given bel: f(s) = |s| x Number of times s occurs in t. Jane wants to know the maximum value of f(s) among all the substrings (s) of string t...",
    label: "String Value",
    icon: "fa fa-cogs",
    url: URL + "/problema-3",
  }
];