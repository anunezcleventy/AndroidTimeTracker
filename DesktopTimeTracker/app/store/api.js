import axios from 'axios';

const api = axios.create({
	baseURL: 'http://dev.sistemauno.com/',
	headers: {}
});

api.isNetworkAvailable = function() {
	return navigator.onLine;
}

api.login = function(user, password, p, app, cb) {
	api.post('/source/ws/uno_wsj_login.php', {
			'user': user,
			'password': password,
			'p': p,
			'app': app
		})
		.then(function(response) {
			cb(null, response.data);
		})
		.catch(function (error) {
			cb(error, null);
		});
}

// http://<host>:<port>/<appcontext>/structure/school/schoolId/stageId
api.getSchoolStructure = function (schoolId, stageId, cb) {
	api.get('/structure/school/' + schoolId + '/' + stageId)
		.then(function(response) {
			cb(null, response.data);
		})
		.catch(function (error) {
			cb(error, null);
		});
}

// http://<host>:<port>/<appcontext>/content/school/schooId/stageId/timestamp
api.getSchoolContent = function (schoolId, stageId, cb, timestamp = -1) {
	api.get('/content/school/' + schoolId + '/' + stageId + '/' + timeStamp)
		.then(function(response) {
			cb(null, response.data);
		})
		.catch(function (error) {
			cb(error, null);
		});
}

// http://<host>:<port>/<appcontext>/structure/student/schoolId/stageId/userId
api.getStudentStructure = function () {
	
}

// http://<host>:<port>/<appcontext>/content/student/schooId/stageId/userId/timestamp
api.getStudentContent = function () {
	
}

// http://<host>:<port>/<appcontext>/structure/teacher/schoolId/stageId/userId
api.getTeacherStructure = function (schoolId, stageId, userId, cb) {
	api.get('/structure/teacher/' + schoolId + '/' + stageId + '/' + userId)
		.then(function(response) {
			cb(null, response.data);
		})
		.catch(function (error) {
			cb(error, null);
		});
}

// http://<host>:<port>/<appcontext>/content/teacher/schooId/stageId/userId/timestamp
api.getTeacherContent = function () {
	
}

// http://<host>:<port>/<appcontext>/structure/grade/schoolId/stageId/gradeId
api.getGradeStructure = function () {
	
}

// http://<host>:<port>/<appcontext>/content/grade/schoolId/stageId/gradeId/timestamp
api.getGradeContent = function () {
	
}

// http://<host>:<port>/<appcontext>/structure/users/schoolId/stageId
api.getUsersStructure = function () {
	
}

// http://<host>:<port>/<appcontext>/content/users/schoolId/stageId/timestamp
api.getUsersContent = function () {
	
}

// http://<host>:<port>/<appcontext>/content/schoolId/stageId/id/timestamp
api.getContent = function () {
	
}


export default api