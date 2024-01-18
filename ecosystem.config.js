module.exports = {
  apps: [
    {
      name: 'registroUsuario:3020',
      script: 'registroUsuario.js',
      cwd: 'pages/api/usuario', // Ruta al directorio de la primera API
    },
    {
      name: 'alertas:3051',
      script: 'registroAlertasSensor.js',
      cwd: 'pages/api/alertas', // Ruta al directorio de la segunda API
    },
    {
      name: 'RFID:3060',
      script: 'registroRFID.js',
      cwd: 'pages/api/rfid', // Ruta al directorio de la segunda API
    },
    {
      name: 'registroProveedor:3070',
      script: 'registroProveedor.js',
      cwd: 'pages/api/proveedor', // Ruta al directorio de la segunda API
    },
    {
      name: 'alimento:3080',
      script: 'registroSolicitudAlimento.js',
      cwd: 'pages/api/alimento', // Ruta al directorio de la primera API
    },
    {
      name: 'alimento:3081',
      script: 'alimento.js',
      cwd: 'pages/api/alimento', // Ruta al directorio de la segunda API
    },
    {
      name: 'alimento:3082',
      script: 'registroSolicitudCompraAlimento.js',
      cwd: 'pages/api/alimento', // Ruta al directorio de la segunda API
    },
    {
      name: 'licitacion:3083',
      script: 'solicitudlicitacion.js',
      cwd: 'pages/api/licitacion', // Ruta al directorio de la segunda API
    },
    {
      name: 'cerdo:3085',
      script: 'cerdo.js',
      cwd: 'pages/api/cerdo', // Ruta al directorio de la segunda API
    },
    {
      name: 'cerdo:3086',
      script: 'solicitud.js',
      cwd: 'pages/api/solicitud', // Ruta al directorio de la segunda API
    },
    {
      name: 'cerdo:3087',
      script: 'tablaSolicitudCerdo.js',
      cwd: 'pages/api/cerdo', // Ruta al directorio de la segunda API
    },
    {
      name: 'compra:3090',
      script: 'compra.js',
      cwd: 'pages/api/compra', // Ruta al directorio de la segunda API
    },
    {
      name: 'silumacion:3141',
      script: 'simulacion.js',
      cwd: 'pages/api/simulacion', // Ruta al directorio de la segunda API
    },
    {
      name: 'historial:3142',
      script: 'hisorial.js',
      cwd: 'pages/api/historial', // Ruta al directorio de la segunda API
    },
    {
      name: 'gastos:3143',
      script: 'gastos.js',
      cwd: 'pages/api/gastosQuincena', // Ruta al directorio de la segunda API
    },
    {
      name: 'notificaciones:5010',
      script: 'notificationapi.js',
      cwd: 'public/api/pronostico/js', // Ruta al directorio de la segunda API
    },
    
    	
    // ... puedes agregar más aplicaciones aquí
  ],
};

