# Moment 2 Webbutveckling III - NodeJS & Gulp

## Automatiseringsprocessens syfte

Syftet med automatisering är att underlätta och effektivisera arbetsprocessen för oss utvecklare genom att automatisera olika aktiviteter som vi genomför ofta, så som att slå samman, komprimera och konvertera filer.


## Paket och verktyg

I detta moment har jag använt följande paket:

* **gulp-concat** - för att slå samman flera JavaScript-filer och CSS-filer till en JavaScript-fil och CSS-fil, som blir de filer som sedan publiceras.
* **gulp-uglify-es** - för att komprimera JavaScript-koden i publiceringsfilen.
* **gulp-clean-css** - för att komprimera CSS-koden i publiceringsfilen.
* **gulp-imagemin** - för att komprimera bildfiler.
* **browser-sync** - för att automatiskt ladda om filerna i webbläsaren när filerna ändras.

*Alla ovanstående paket har valts på grund av att de verkar populära och väl använda.*


Följande verktyg har använts:

* **Visual Studio Code** - En bra kodeditor som stödjer många språk, verktyg och tillägg.
* **NodeJs & NPM** - NodeJs och dess pakethanterare NPM är använda just för att på ett resurseffektivt och snabbt sätt kunna skapa automatiseringsprocessen genom funktioner som arbetar i bakgrunden.
* **Gulp** - används för att det är ett populärt paket att använda till automatisering, samt att det har många plugins samt en logik i koden. (också för att det var ett krav i uppgiften).
* **Git & Github** - används för att versionshantera. Det är ett smidigt och populärt verktyg/tjänst som känns enkel och trygg att använda och gör det smidigt att återanvända detta skapade system när nya projekt ska skapas.


## Systemets funktion
När kodfilerna klonas från Github så öppnar man upp mappen i sin kodeditor och öppnar terminalen alternativt söker sig in till mappen via kommandotolken och skriver kommandot "nmp install" för att installera alla npm-paket som systemet innehåller samt node_modules-mappen som behövs för gulp.


För att starta systemet skrivs "gulp" i terminalen. När detta sker körs först funktioner där alla HTML-filer i src-katalogen kopieras till pub - katalogen för publicering, JavaScript-filerna slås samman till en fil med namnet main.js, minifieras och läggs i pub-katalogen i underkatalogen "js", CSS-filerna slås samman till en med namnet stylesheet.css, minifieras och läggs i pub-katalogen  i underkatalogen "css" och bildfilerna komprimeras och kopieras till underkatalogen "pics" i pub-katalogen.

Därefter startas en watch-funktion. Denna håler koll på om det förändras något i filerna i src-katalogen och startar då funktionerna som beskrivits ovan, där filerna kopieras över till pub-katalogen. Det finns också en Browser Sync-"task" i watch-funktionen som vid förändringar i filerna automatiskt uppdaterar webbläsarfönstret och visar de uppdaterade filerna i pub-katalogen. Vid första förändringen öppnas även automatiskt ett webbläsarfönster som visar filerna på den serveradress som lyssnar till Browser Sync-funktionen.

