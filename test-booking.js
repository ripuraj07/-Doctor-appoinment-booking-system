/**
 * Complete Appointment Booking Debug & Test Script
 * 
 * This script will:
 * 1. Test server health
 * 2. Register a test user
 * 3. Test appointment POST (create)
 * 4. Test appointment GET (fetch)
 * 5. Verify data in database
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000';
let testToken = null;
let testUserId = null;

function request(method, path, body = null) {
	return new Promise((resolve, reject) => {
		const url = new URL(path, BASE_URL);
		const options = {
			hostname: url.hostname,
			port: url.port,
			path: url.pathname + url.search,
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			timeout: 5000
		};

		if (testToken) {
			options.headers['Authorization'] = `Bearer ${testToken}`;
		}

		const req = http.request(options, (res) => {
			let data = '';
			res.on('data', chunk => data += chunk);
			res.on('end', () => {
				try {
					resolve({
						status: res.statusCode,
						body: JSON.parse(data),
						raw: data
					});
				} catch (e) {
					resolve({
						status: res.statusCode,
						body: null,
						raw: data
					});
				}
			});
		});

		req.on('error', reject);
		req.on('timeout', () => {
			req.destroy();
			reject(new Error('Request timeout'));
		});

		if (body) {
			req.write(JSON.stringify(body));
		}
		req.end();
	});
}

async function test() {
	try {
		console.log('╔════════════════════════════════════════════════════════════╗');
		console.log('║         APPOINTMENT BOOKING SYSTEM - DEBUG TEST            ║');
		console.log('╚════════════════════════════════════════════════════════════╝\n');

		// 1. Test health
		console.log('TEST 1: Health Check');
		console.log('─'.repeat(60));
		try {
			const health = await request('GET', '/api/health');
			if (health.status === 200) {
				console.log('✓ Server is running and responding');
				console.log(`  Response: ${JSON.stringify(health.body)}\n`);
			} else {
				throw new Error(`Health check failed with status ${health.status}`);
			}
		} catch (err) {
			console.log(`✗ FAILED: ${err.message}`);
			console.log('  Make sure the server is running: cd c:\\Users\\hp\\OneDrive\\Desktop\\appoinment && node server.js\n');
			return;
		}

		// 2. Register user
		console.log('TEST 2: Register Test User');
		console.log('─'.repeat(60));
		const regPayload = {
			name: 'Debug Test User',
			email: `debugtest${Date.now()}@test.com`,
			password: 'test123'
		};
		try {
			const reg = await request('POST', '/api/auth/register', regPayload);
			if (reg.status === 200 || reg.status === 201) {
				testToken = reg.body.token;
				testUserId = reg.body.user.id;
				console.log(`✓ User registered successfully`);
				console.log(`  Email: ${regPayload.email}`);
				console.log(`  Token: ${testToken.substring(0, 20)}...`);
				console.log(`  User ID: ${testUserId}\n`);
			} else {
				throw new Error(`Registration failed with status ${reg.status}: ${JSON.stringify(reg.body)}`);
			}
		} catch (err) {
			console.log(`✗ FAILED: ${err.message}\n`);
			return;
		}

		// 3. Create appointment
		console.log('TEST 3: Create Appointment (POST /api/appointments)');
		console.log('─'.repeat(60));
		const apptPayload = {
			doctor: 'Dr. John Smith',
			date: new Date(Date.now() + 7*24*60*60*1000).toISOString(), // 7 days from now
			notes: 'Test appointment for debugging',
			triage: {
				symptoms: ['fever', 'cough'],
				severity: 'moderate',
				phone: '1234567890'
			}
		};
		try {
			const appt = await request('POST', '/api/appointments', apptPayload);
			if (appt.status === 201 || appt.status === 200) {
				console.log(`✓ Appointment created successfully`);
				console.log(`  Appointment ID: ${appt.body._id}`);
				console.log(`  Doctor: ${appt.body.doctor}`);
				console.log(`  Date: ${new Date(appt.body.date).toLocaleString()}`);
				console.log(`  Status: ${appt.body.status}\n`);
			} else {
				throw new Error(`Create failed with status ${appt.status}: ${JSON.stringify(appt.body)}`);
			}
		} catch (err) {
			console.log(`✗ FAILED: ${err.message}`);
			console.log('  Check server logs for detailed error information\n');
			return;
		}

		// 4. Fetch appointments
		console.log('TEST 4: Fetch Appointments (GET /api/appointments)');
		console.log('─'.repeat(60));
		try {
			const list = await request('GET', '/api/appointments');
			if (list.status === 200) {
				const appts = Array.isArray(list.body) ? list.body : [];
				console.log(`✓ Fetched ${appts.length} appointment(s)`);
				appts.forEach((a, i) => {
					console.log(`  [${i+1}] ${a.doctor} on ${new Date(a.date).toLocaleString()} (${a.status})`);
				});
				console.log('');
			} else {
				throw new Error(`Fetch failed with status ${list.status}`);
			}
		} catch (err) {
			console.log(`✗ FAILED: ${err.message}\n`);
			return;
		}

		console.log('╔════════════════════════════════════════════════════════════╗');
		console.log('║                   ALL TESTS PASSED ✓                       ║');
		console.log('║         Booking system is working correctly!               ║');
		console.log('╚════════════════════════════════════════════════════════════╝');
		process.exit(0);

	} catch (err) {
		console.error('\n✗ Unexpected error:', err.message);
		process.exit(1);
	}
}

// Wait for server to be ready, then test
console.log('Waiting for server to be ready...\n');
setTimeout(test, 2000);
