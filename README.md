# Тестовое задание для компании Valantis

## Задача
Используя предоставленный апи создать страницу, которая отображает список товаров.
Для каждого товара должен отображаться его id, название, цена и бренд.

## Требования
* Выводить по 50 товаров на страницу с возможностью постраничного перехода (пагинация) в обе стороны.
* Возможность фильтровать выдачу используя предоставленное апи по названию, цене и бренду
* Если API возвращает дубли по id, то следует их считать одним товаром и выводить только первый, даже если другие поля различаются. Если API возвращает ошибку, следует вывести идентификатор ошибки в консоль, если он есть и повторить запрос.

## Технологии
* HTML5
* SCSS
* Адаптивная вёрстка
* БЭМ
* JavaScript (стандарт ES6)
* PropTypes
* React
* REST API
* Git

## Установка и запуск проекта локально

* Клонировать репозиторий
  `git clone git@github.com:SorokinaMarina/Valantis.git`

* Перейти в папку "Valantis"
  `cd Valantis`

* Установить зависимости
  `npm i`

* Запустить фронтенд часть
  `npm run start`

## [Ссылка на gh-pages](https://sorokinamarina.github.io/Valantis/)

## В планах
* Переписать проект на TypeScript

