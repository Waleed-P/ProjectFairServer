const express = require('express')
const router= new express.Router()
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddlware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
// register
router.post('/register',userController.register)
//login
router.post('/login',userController.login)
//add project
router.post('/add_project',jwtMiddlware,multerConfig.single('project_image'),projectController.addProject)
//get all projects
router.get('/get_all_projects',jwtMiddlware,projectController.getAllProjects)
//get all user projects
router.get('/get_user_projects',jwtMiddlware,projectController.getAllUserProjects)
//get dahsboard projects
router.get('/get_home_projects',projectController.getHomeProjects)
//edit project
router.put('/edit_project/:pid',jwtMiddlware,multerConfig.single('project_image'),projectController.editProject)
//delete project
router.delete('/remove_project/:pid',jwtMiddlware,projectController.removeProject)
//edit user
router.put('/edit_user',jwtMiddlware,multerConfig.single('profile_image'),userController.editUser)
//export router
module.exports = router