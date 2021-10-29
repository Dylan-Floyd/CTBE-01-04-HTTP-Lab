module.exports = rawRequest => {
  const lines = rawRequest.split('\r\n');
  const [method, path] = lines[0].split(' ');
  let body = undefined;
  lines.forEach(line => {
    const [key, value] = line.split(': ');
    if(key === 'Content-Length') {
      const len = Number(value);
      body = lines[lines.length - 1].slice(-len);
    }
  });
  return { method, path, body };
};
