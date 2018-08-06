import { Router } from 'express';
import * as CategoryController from './category.controller';

const routes: Router = Router();

routes.get('/', CategoryController.getCategory);

routes.post('/add', CategoryController.addCategory);

routes.patch('/edit', CategoryController.editCategory);
// If you only need to update one field for the resource,
// you may want to use the PATCH method
routes.delete('/remove', CategoryController.deleteCategory);

export default routes;