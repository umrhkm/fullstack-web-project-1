const router = require('express').Router();
const { create_final_project, grade_final_project, add_answer, get_final_project_answers, get_a_final_project_answer, get_all_final_project, get_a_final_project, get_final_project_by_course, get_a_final_project_score, update_final_project, delete_final_project } = require('../controllers/finalProjectControllers')
const { verifyToken } = require('../auth/verifyToken')

router.post('/create/:id_course', verifyToken, async (req, res) => {
    return create_final_project(req, res, req.params.id_course)
})

router.put('/grade/:id_fp/:id_user', verifyToken, async (req, res) => {
    return grade_final_project(req, res, req.params.id_fp, req.params.id_user)
})

router.put('/answer/add/:id_fp/', verifyToken, async (req, res) => {
    return add_answer(req, res, req.params.id_fp)
})

router.put('/update-case/:id_fp/', verifyToken, async (req, res) => {
    return update_final_project(req, res, req.params.id_fp)
})

router.get('/answer/:id_fp', verifyToken, async (req, res) => {
    return get_final_project_answers(req, res, req.params.id_fp)
})

router.get('/answer/:id_fp/:id_user', verifyToken, async (req, res) => {
    return get_a_final_project_answer(req, res, req.params.id_fp, req.params.id_user)
})

router.get('/', verifyToken, async (req, res) => {
    return get_all_final_project(req, res)
})

router.get('/:id', verifyToken, async (req, res) => {
    return get_a_final_project(req, res, req.params.id)
})

router.get('/search-by-course/:id_course', verifyToken, async (req, res) => {
    return get_final_project_by_course(req, res, req.params.id_course)
})

router.get('/score/:id_fp/:id_user', verifyToken, async (req, res) => {
    return get_a_final_project_score(req, res, req.params.id_fp, req.params.id_user)
})

router.delete("/delete/:id_fp", verifyToken, async (req, res) => {
    return delete_final_project(req, res, req.params.id_fp)
})

module.exports = router;