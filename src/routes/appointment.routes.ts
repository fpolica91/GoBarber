import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
const appointmentRouter = Router();
import AppointmentRepository from '../Repository/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

appointmentRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body;
    const parsedDate = parseISO(date);
    /**
     * @createAppointmentService already has access to database,
     * @getCustomRepository not needed in this route
     */
    const createAppointmentService = new CreateAppointmentService();
    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      provider_id
    });
    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

appointmentRouter.get('/', async (req, res) => {
  /** you use the function @getCustomRepository
   * once  @appointmentService is set you have access to typeORM functions
   * @typeORM functions find, create, save
   */

  const appointmentService = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentService.find();
  return res.json(appointments);
});

export default appointmentRouter;
