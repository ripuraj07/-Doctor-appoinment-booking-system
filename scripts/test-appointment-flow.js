#!/usr/bin/env node
/**
 * Comprehensive test for appointment booking flow
 * Tests:
 * 1. Register a new user
 * 2. Book an appointment
 * 3. Fetch appointments
 * 4. Verify appointment is saved
 */

const base = 'http://localhost:5000';

async function test() {
  console.log('\n' + '='.repeat(70));
  console.log('APPOINTMENT BOOKING FLOW TEST');
  console.log('='.repeat(70) + '\n');

  // Wait for server
  console.log('⏳ Waiting for server to be ready...');
  for (let i = 0; i < 15; i++) {
    try {
      const h = await fetch(base + '/api/health');
      if (h.ok) {
        console.log('✅ Server is ready!\n');
        break;
      }
    } catch (e) {
      if (i === 14) throw new Error('Server not responding after 15 attempts');
    }
    await new Promise(r => setTimeout(r, 1000));
  }

  // Step 1: Register user
  console.log('STEP 1: Register New User');
  console.log('-'.repeat(70));
  const email = `test_${Date.now()}@example.com`;
  const name = 'Test User ' + Date.now();
  
  console.log(`📝 Registering user: ${name} (${email})`);
  const regRes = await fetch(base + '/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password: 'password123' })
  });
  
  if (!regRes.ok) {
    const error = await regRes.json();
    throw new Error('Registration failed: ' + JSON.stringify(error));
  }
  
  const regData = await regRes.json();
  const token = regData.token;
  const userId = regData.user.id;
  
  console.log('✅ Registration successful');
  console.log('   User ID:', userId);
  console.log('   Token:', token.substring(0, 50) + '...\n');

  // Step 2: Check initial appointments (should be empty)
  console.log('STEP 2: Check Initial Appointments');
  console.log('-'.repeat(70));
  
  const initRes = await fetch(base + '/api/appointments', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  
  if (!initRes.ok) {
    throw new Error('Fetch failed: ' + initRes.statusText);
  }
  
  const initialAppts = await initRes.json();
  console.log(`📋 Initial appointments: ${initialAppts.length}`);
  if (initialAppts.length > 0) {
    console.log('⚠️  Warning: User already has appointments!');
  }
  console.log();

  // Step 3: Book appointment
  console.log('STEP 3: Book New Appointment');
  console.log('-'.repeat(70));
  
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7); // 7 days from now
  
  const appointmentData = {
    doctor: 'Dr. Test Smith',
    date: futureDate.toISOString(),
    notes: 'Test appointment for headache and fever',
    triage: {
      symptoms: ['headache', 'fever'],
      severity: 'moderate',
      phone: '555-1234'
    }
  };
  
  console.log('📅 Booking details:');
  console.log('   Doctor:', appointmentData.doctor);
  console.log('   Date:', new Date(appointmentData.date).toLocaleString());
  console.log('   Notes:', appointmentData.notes);
  console.log('   Symptoms:', appointmentData.triage.symptoms.join(', '));
  console.log('   Severity:', appointmentData.triage.severity);
  console.log('   Phone:', appointmentData.triage.phone);
  
  const bookRes = await fetch(base + '/api/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(appointmentData)
  });
  
  if (!bookRes.ok) {
    const error = await bookRes.json();
    throw new Error('Booking failed: ' + JSON.stringify(error));
  }
  
  const bookedAppt = await bookRes.json();
  console.log('✅ Appointment booked successfully');
  console.log('   Appointment ID:', bookedAppt._id);
  console.log('   Status:', bookedAppt.status);
  console.log('   Created:', new Date(bookedAppt.createdAt).toLocaleString() + '\n');

  // Step 4: Fetch appointments again
  console.log('STEP 4: Verify Appointment in List');
  console.log('-'.repeat(70));
  
  const listRes = await fetch(base + '/api/appointments', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  
  if (!listRes.ok) {
    throw new Error('Fetch failed: ' + listRes.statusText);
  }
  
  const appts = await listRes.json();
  console.log(`📋 Total appointments: ${appts.length}`);
  
  const found = appts.find(a => a._id === bookedAppt._id);
  if (!found) {
    throw new Error('❌ Appointment not found in list!');
  }
  
  console.log('✅ Appointment found in list');
  console.log('   Doctor:', found.doctor);
  console.log('   Date:', new Date(found.date).toLocaleString());
  console.log('   Status:', found.status);
  console.log('   Notes:', found.notes);
  console.log();

  // Step 5: Book another appointment
  console.log('STEP 5: Book Second Appointment');
  console.log('-'.repeat(70));
  
  const futureDate2 = new Date();
  futureDate2.setDate(futureDate2.getDate() + 14); // 14 days from now
  
  const apptData2 = {
    doctor: 'Dr. Jane Doe',
    date: futureDate2.toISOString(),
    notes: 'Follow-up visit',
    triage: {
      symptoms: ['follow-up'],
      severity: 'mild'
    }
  };
  
  console.log('📅 Booking second appointment...');
  const bookRes2 = await fetch(base + '/api/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(apptData2)
  });
  
  if (!bookRes2.ok) {
    throw new Error('Second booking failed: ' + (await bookRes2.json()).message);
  }
  
  const bookedAppt2 = await bookRes2.json();
  console.log('✅ Second appointment booked');
  console.log('   ID:', bookedAppt2._id);
  console.log('   Doctor:', bookedAppt2.doctor + '\n');

  // Step 6: Final check
  console.log('STEP 6: Final Verification');
  console.log('-'.repeat(70));
  
  const finalRes = await fetch(base + '/api/appointments', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  
  const finalAppts = await finalRes.json();
  console.log(`📋 Final appointment count: ${finalAppts.length}`);
  
  finalAppts.forEach((appt, idx) => {
    const dateStr = new Date(appt.date).toLocaleString();
    console.log(`   [${idx + 1}] ${appt.doctor} - ${dateStr} (${appt.status})`);
  });
  
  if (finalAppts.length !== 2) {
    throw new Error(`❌ Expected 2 appointments, found ${finalAppts.length}`);
  }

  console.log('\n' + '='.repeat(70));
  console.log('✅ ALL TESTS PASSED!');
  console.log('='.repeat(70) + '\n');
  console.log('Summary:');
  console.log('✓ User registration works');
  console.log('✓ Appointment booking works');
  console.log('✓ Appointments are saved to database');
  console.log('✓ Appointments can be fetched');
  console.log('✓ Multiple appointments work');
  console.log('\n');
}

test().catch(err => {
  console.error('\n' + '='.repeat(70));
  console.error('❌ TEST FAILED');
  console.error('='.repeat(70));
  console.error('\nError:', err.message);
  console.error(err.stack);
  console.error('\n');
  process.exit(1);
});
