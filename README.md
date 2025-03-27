# Задание для компании 'Империя кофе'

### Что нужно сделать чтобы запустить:

- клонировать репозиторий:
  `git clone`
- зайти в папку:
  `cd coffee_task`
- поднять докер контейнер:
  `docker-compose up -d`
- зайти на http://localhost:3000

> Бывает что нужно запустить от имени администратора:
> `sudo docker-compose up -d`

### Комментарии:

- аутентификация происходит при помощи модуля **nuxt-auth-utils**. Сессия запоминается в куках. для аутентификации докер пробрасывает в env ключ.
- пускаются только активные пользователи (у нас 2 активных, 1 - нет)
- в объекте с пользователями почему-то пароль был записан только в поле \_comment. я добавил отдельное поле password. стоит ли говорить о том что этот подход не очень безопасен в проде ;)
- использовал небольшую валидацию на фронте и бэке дабы не обрабатывать пустые строки
- фильтр по **date_created** я решил сделать в виде календаря - не очень удобно вводить даты вручную. В календаре же можно выбрать даты _от_ и _до_ и отфильтровать таким образом данные.

> Если нужно отфильтровать только один день - нужно два раза нажать на число в календаре

Для удобства зелеными точками на календаре отмечены дни в которые был создан как минимум один item.

В остальном - старался придерживаться ТЗ
