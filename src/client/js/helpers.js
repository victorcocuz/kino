function capitalize(str, lower=false) {
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
}

export { 
    capitalize
 }