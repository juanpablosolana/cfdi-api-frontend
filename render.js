function render(cfdi) {
  cleanRender()
  cfdi.forEach(renderElement)
}


function buildElement({
  serie,
  folio,
  lugarExpedicion,
  noCertificado,
  noCertificadoSAT,
  uuid,
  fechaTimbrado,
  fecha,
  subTotal,
  moneda,
  total,
  tipoDeComprobante,
   ... rest
})
   {
  console.log(rest.timbreFiscal.uuid)
  const template=
  `
  <details >
  <summary>
  Folio SAT: ${rest.timbreFiscal.uuid.toUpperCase()}
  </summary>
  <section class="grid">
  <h2>Datos de la factura</h2> <br>
  <p class="item">Serie: ${serie}</p>
  <p class="item">Folio: ${folio}</p>
  <p class="item">Lugar: ${lugarExpedicion}</p>
  <p class="item">Certificado CSD: ${noCertificado}</p>
  <p class="item">Certificado SAT :${rest.timbreFiscal.noCertificadoSAT}</p>
  <p class="item"> Folio Sat: ${rest.timbreFiscal.uuid}</p>
  <p class="item">Fecha de certificacion: ${rest.timbreFiscal.fechaTimbrado}</p>
  <p class="item">Fecha de emision: ${fecha}</p>
  <p class="item">Comprobante: ${tipoDeComprobante}</p>
  <div></div> <h2> Emisor </h2> <div></div>
  <p class="item">RFC: ${rest.emisor.rfc}</p>
  <p class="item">${rest.emisor.nombre}</p>
  <p class="item fiscal">Regimen fiscal: ${rest.emisor.regimenFiscal}</p>
  <br><h2> Receptor </h2><br><br>
  <p class="item">RFC: ${rest.receptor.rfc}</p>
  <p class="item">${rest.receptor.nombre}</p>
  <p class="item">Uso del CFDI: ${rest.receptor.usoCFDI}</p>
  <div></div> <h2>Conceptos</h2><div></div>
  ${rest.conceptos.map((element, index)=>{

    return`
    <p class="item">Cantindad: ${rest.conceptos[index].cantidad}</p>
    <p class="item">Unidad de medida: ${rest.conceptos[index].claveUnidad}</p>
    <p class="item">Clave del Producto ${rest.conceptos[index].claveProdServ}</p>
    <p class="item">Descripcion: ${rest.conceptos[index].descripcion}</p>
    <p class="item">Valor unitario: ${rest.conceptos[index].valorUnitario}</p>
    <p class="item">Importe: ${rest.conceptos[index].importe}</p>
    `}).join('\n')}
  <h2>Totales</h2><div></div>
    <p class="item">Sub total: ${subTotal}</p>
    <p class="item">IVA: ${rest.impuestos.totalImpuestosTrasladados}</p>
    <p class="item">Total: ${total}</p>
    <p class="item">Moneda: ${moneda}</p>
    </section>
  </details>
  `
  // debugger
  const cfdi=document.createElement('div')
  cfdi.innerHTML=template
  return cfdi
}

function renderElement(cfdi) {
  const element = buildElement(cfdi)
  window.container.append(element)
}

function cleanRender(){
  window.container.innerHTML=''
}


export default render;