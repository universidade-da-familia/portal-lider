import { capitalCase } from 'change-case';

export function formatName(name) {
  const mapObj = {
    ' E ': ' e ',
    ' Y ': ' y ',
    ' De ': ' de ',
    ' Le ': ' le ',
    ' Lo ': ' lo ',
    ' Los ': ' los ',
    ' La ': ' la ',
    ' Las ': ' las ',
    ' Do ': ' do ',
    ' Dos ': ' dos ',
    ' Da ': ' da ',
    ' Das ': ' das ',
    ' Del ': ' del ',
    ' Van ': ' van ',
    ' Von ': ' von ',
    ' Bin ': ' bin ',
    ' Mc ': ' mc ',
    ' Mac ': ' mac ',
  };

  const capitalCaseName = capitalCase(name, {
    stripRegexp: / /g,
  });

  const formatedName = capitalCaseName.replace(
    / E | Y | De | Le | Lo | Los | La | Las | Do | Dos | Da | Das | Del | Van | Von | Bin | Mc | Mac /g,
    function(matched) {
      return mapObj[matched];
    }
  );

  return formatedName;
}
