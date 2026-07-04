const fs = require('fs');

const html = fs.readFileSync('/app/Aivion.dc.html', 'utf8');

// The code review mentioned that <sc-if> and <sc-html> are hallucinated custom tags. Wait, `<sc-if>` is already used in the file! Look at the grep output!
// But wait, it also said: "The agent should have used the correct conditional/HTML-rendering syntax for the DCLogic framework, or simply conditionally rendered standard HTML based on the caseData.label."
// And `<sc-html>` is definitely hallucinated (it's not used anywhere else). Wait, what does the framework support?
