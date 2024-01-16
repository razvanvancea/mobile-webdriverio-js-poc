prerequisites:

am 2 emulatoare, unul pt rulare teste, altul pt selectori, fiecare cu versiuni diferite de android (ex: Pixel 3 cu android 13, pixel 3 cu android 12)

rulare test

- testele le rulez pe portul 4723
- npx wdio run wdio.conf.js

generare selectori

1. pornesc emulatorul mobil de teste
2. pornesc appium inspector, ii setez configuratia
3. pornesc serverul appium din CLI cu appium -p 4724
