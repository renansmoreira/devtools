git ls-files -- ':!:*.delete' ':!:*.jks' ':!:*jwks.json' ':!:*.docx' ':!:*.doc' \
        ':!:*.svg' ':!:*.jpg' ':!:*.jpeg' ':!:*.pdf' ':!:*.npmrc' ':!:*cypress*' ':!:*xls' ':!:*xlsx' \
        ':!:*.gif' ':!:*.png' ':!:*libs/*' ':!:*eot' ':!:*ttf' ':!:*ico' ':!:*manifest.json' \
        ':!:*shepherd.min*' ':!:*primefaces-locale*' ':!:*mouse-flow.js' ':!:*light.min.js' \
        ':!:*fontawesome.min.js' ':!:*.woff' ':!:*woff2' ':!:*certificadodigital*' ':!:*newrelic.browser.min.js' \
        ':!:*jquery*' ':!:*blog/themes/*' ':!:*blog/scaffolds/*' ':!:*log4j.xml' ':!:*inputmask.js' \
        ':!:*.dll' ':!:*.exe' ':!:*.nupkg' ':!:*.p7s' ':!:*packages/*' ':!:*lib/*' ':!:*Scripts/*' \
        ':!:*.csproj' ':!:*digix-ui/*' ':!:*/bower_components/*' ':!:*.jasper' ':!:*.jrxml' \
        ':!:*.dfm' ':!:*.dpr' ':!:*.dproj' ':!:*.res' ':!:*.stat' ':!:*.bmp' ':!:*.stackdump' \
        ':!:*components/*' ':!:*.txt' ':!:*.rtf' ':!:*.ridl' ':!:*.tlb' | xargs cat | wc -l