
const extractDefinitionData = (dictionaryObject, defId) => {
  const lexicalCategory = dictionaryObject[defId].lexicalCategory ? dictionaryObject[defId].lexicalCategory : null
  console.log('lexical', lexicalCategory)
  const dictionaryIndices = dictionaryObject ? dictionaryObject.length : null
  console.log('dict indices', dictionaryIndices)

  const translation = dictionaryObject[defId].entries[0].senses[0].translations ? dictionaryObject[defId].entries[0].senses[0].translations.map(sense => sense.text).join(', ') : (dictionaryObject[defId].entries[0].senses[0].subsenses ? dictionaryObject[defId].entries[0].senses[0].subsenses[0].translations.map(sense => sense.text).join(', ') : 'Not found')
  console.log('translation', translation)

  const lexicalInfo = `${lexicalCategory ? lexicalCategory : null}; ${dictionaryObject[defId].entries[0].grammaticalFeatures.map(sense => `${sense.type}: ${sense.text}`).join(`; `)}`
  console.log('lexicalInfo', lexicalInfo)

  return ({
    lexicalInfo,
    dictionaryIndices,
    translation
  })
}

const extractExamplesData = (examplesObject, exampleId) => {
  const exampleIndices = examplesObject ? examplesObject.length : null

  const exampleIdPresent = examplesObject ? examplesObject[exampleId] : null

  const example = exampleIdPresent ? `(${examplesObject[exampleId].domains}) ${examplesObject[exampleId].text}` : 'Not found'

  return ({
    exampleIndices,
    example
  })
}

module.exports = {extractDefinitionData, extractExamplesData}
