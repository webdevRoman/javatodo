# Java ToDo

## Инструкция по сборке и запуску приложения
Для сборки и запуска приложения необходимо, чтобы на машине была установлена JDK 1.8+ и gradle.
1. Создайте базу данных:

    1.1. Установите PostgreSQL и pgAdmin.
    
    1.2. Откройте pgAdmin и создайте новую базу данных:
    
    ![pgAdmin](https://raw.githubusercontent.com/webdevRoman/gitImages/master/SSP_Software/pgAdmin.png)
    
    1.3. При создании базы данных введите название, владельцем оставьте postgres.
    
2. Соберите приложение:

    2.1. Клонируйте git-репозиторий с помощью следующей команды терминала:
    
    `git clone https://github.com/webdevRoman/javatodo.git`
    
    2.2. Перейдите в папку с проектом:
    
    `cd javatodo`

    2.3. Соберите проект:
    
    `gradle build`

3. Запустите приложение:

    3.1. Перейдите в папку build/libs и создайте в ней файл application.properties со следующим содержанием:
    ```
    spring.datasource.url=jdbc:postgresql://localhost:5432/<database_name>
    spring.datasource.username=postgres
    spring.datasource.password=<password>
    spring.jpa.generate-ddl=true
    ```
    
    Вместо <database_name> введите имя базы данных, которое вы вводили при создании базы данных. Вместо <password> введите пароль пользователя postgres.
    
    3.2. Вернитесь в терминал, перейдите в папку build/libs:
   
    `cd build/libs`
    
    3.3. Для запуска приложения выполните следующую команду:
   
    `java -jar javatodo-0.0.1-SNAPSHOT.jar --spring.config.location=file:./application.properties`
    
    3.4. Приложение доступно по следующему адресу:
   
    `http://localhost:8080/`
