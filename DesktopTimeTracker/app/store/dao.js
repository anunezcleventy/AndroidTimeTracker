import { EventEmitter } from 'events';

const dao = new EventEmitter();

dao.getPerson = function(personId, cb) {
	db.get("query personId = $id", { $id: personId }, function(err, row) {
		cb(null, row);
	});
}

dao.getTestData = function(cb) {
	db.all('select * from test', [], cb);
}

dao.getUsers = function (cb) {
	var users = {};
	var n = 0;
	db.each("select * from user", function(err, row){
		users[n] = row;
		n++;
	}, function(err, rowCount){
		cb(null, users);
	});
}

dao.getRecordedUsers = function (cb) {
	/*db.run("DELETE FROM recorded_users");*/
	var recordedUsers = {};
	var n = 0;
	db.each("select * from user where remember=1", function(err, row){
		recordedUsers[n] = row;
		n++;
	}, function(err, rowCount){
		cb(null, recordedUsers);
	});
}

dao.getUser = function(userLogin, cb) {
	db.get("select * from user where login=?", {1:userLogin}, function(err, row){
		cb(null, row);
	});
}

dao.insertUser = function(user, cb) {
	/*db.run("CREATE TABLE `user` (`id`	INTEGER, `login`	TEXT, `pass`	TEXT, `firstName`	TEXT, `lastName`	TEXT, `genre`	TEXT, `rolId`	INTEGER, `image`	TEXT, `locale`	TEXT, `theme`	TEXT, `schoolId`	INTEGER, `stageId`	INTEGER, `loginDate`	NUMERIC, `remember`		BIT,PRIMARY KEY(`id`))");*/
	/*db.run("DROP TABLE user");*/
	db.serialize(function(){
		var stmt = db.prepare("insert into user('id', 'login', 'pass', 'firstName', 'lastName', 'genre', 'rolId', 'image', 'locale', 'theme', 'schoolId', 'stageId', 'loginDate', 'remember') values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		stmt.run(user.id, user.login, user.pass, user.firstName, user.lastName, user.genre, user.rolId, user.image, user.locale, user.theme, user.schoolId, user.stageId, user.loginDate, user.remember, function(err) {
			cb(err);
		});
		dao.emit('user-updated');
	});
}

//TODO:remove
dao.insertUserTest = function() { 
	/*db.run("CREATE TABLE `user` (`id`	INTEGER, `login`	TEXT, `pass`	TEXT, `firstName`	TEXT, `lastName`	TEXT, `genre`	TEXT, `rolId`	INTEGER, `image`	TEXT, `locale`	TEXT, `theme`	TEXT, `schoolId`	INTEGER, `stageId`	INTEGER, `loginDate`	NUMERIC, `remember`		BIT,PRIMARY KEY(`id`))");*/
	/*db.run("DROP TABLE user");*/
	 db.serialize(function(){
		var stmt = db.prepare("insert into user('id', 'login', 'pass', 'firstName', 'lastName', 'genre', 'rolId', 'image', 'locale', 'theme', 'schoolId', 'stageId', 'loginDate', 'remember') values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		stmt.run(6, 'test1', '81dc9bdb52d04dc20036dbd8313ed055', 'Test1Name', 'Test1Lastname', '', '', '', '', '', '', '', 1524120579, 1, function(err) {
			
		});
		dao.emit('user-updated');
	});
}  

//TODO:remove
dao.deleteUsers = function() {
	db.run('DELETE FROM user');
}

dao.updateUserRemember = function(userId, newRemember) {
	db.serialize(function(){
		db.run("update user set remember=? where id=?", {
			1:newRemember,
			2:userId
		});
		dao.emit('user-updated');
	});
}

dao.updateUser = function(user) {
	db.serialize(function(){
		db.run("update user set pass=?, firstName=?, lastName=?, locale=?, loginDate=?, remember=? where id=?", {
			1:user.pass,
			2:user.firstName,
			3:user.lastName,
			4:user.locale,
			5:user.loginDate,
			6:user.remember,
			7:user.id
		});
		dao.emit('user-updated');
	});
}

dao.getUserSchoolclasses = function (userId, cb) {
	var schoolclasses = {};
	var n = 0;
	db.each("select * from schoolclass where userId=" + userId, function(err, row){
		schoolclasses[n] = row;
		n++;
	}, function(err, rowCount){
		cb(err, schoolclasses);
	});
}

export default dao