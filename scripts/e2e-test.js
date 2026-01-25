(async ()=>{
  const base = 'http://localhost:5000';
  const wait = ms=>new Promise(r=>setTimeout(r,ms));
  for(let i=0;i<12;i++){
    try{
      const h = await fetch(base+'/api/health');
      if(h.ok) break;
    }catch(e){ }
    await wait(1000);
  }
  try{
    const ts = Date.now();
    const email = `e2etest+${ts}@example.com`;
    console.log('Registering', email);
    const r1 = await fetch(base+'/api/auth/register', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name:'E2E Test', email, password:'password123'})});
    const j1 = await r1.json();
    console.log('REGISTER RESPONSE', j1);
    if(!r1.ok) process.exit(1);

    const token = j1.token;
    const body = { doctor: 'Dr. Test', date: new Date(Date.now()+2*24*3600*1000).toISOString(), notes: 'E2E test', triage: { symptoms: ['cough','fever'], severity:'moderate', phone:'12345' } };
    console.log('Booking with body', body);
    const r2 = await fetch(base+'/api/appointments', {method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+token}, body: JSON.stringify(body)});
    const j2 = await r2.json();
    console.log('BOOK RESPONSE', j2);
    if(!r2.ok) process.exit(1);
    console.log('E2E test completed successfully');
  }catch(err){ console.error('E2E error', err); process.exit(1); }
})();
