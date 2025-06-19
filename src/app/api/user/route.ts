import { connectToDatabase } from "@/lib/mongodb/mongodb";
import { NextResponse } from 'next/server'
import { User, UserPlan ,Plan} from '@/models'

export async function GET(request: Request) {
  await connectToDatabase()

  // Obtener todos los usuarios con su rol
  const usuarios = await User.find().populate('id_rol')

  // Obtener todos los UserPlan activos (puedes filtrar por fecha si deseas)
  const planes = await UserPlan.find({ active: true }).populate('id_plan')
    
  // Asegurarse de que los planes tengan el campo id_user
  // Asociar cada usuario con su plan activo
  const usuariosConPlanes = usuarios.map(user => {
    const userPlan = planes.find(plan => plan.id_user.toString() === user._id.toString())
    return {
      ...user.toObject(),
      rol: user.id_rol,
      plan: userPlan ? userPlan.id_plan : null,
      plan_data: userPlan || null,
    }
  })

  return NextResponse.json({ usuarios: usuariosConPlanes })
}
export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    const { id, is_active, id_plan } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }

    // 1. Siempre actualiza el estado activo
    await User.findByIdAndUpdate(id, { is_active });

    // 2. Solo maneja el plan si id_plan tiene valor (≠ null, ≠ "")
    if (id_plan) {
      const plan = await Plan.findById(id_plan);
      if (!plan) {
        return NextResponse.json({ error: "Plan no encontrado" }, { status: 404 });
      }

      const now = new Date();
      const endDate = new Date(now);
      if (plan.duration === "1 día") endDate.setDate(now.getDate() + 1);
      if (plan.duration === "1 semana") endDate.setDate(now.getDate() + 7);
      if (plan.duration === "1 mes") endDate.setMonth(now.getMonth() + 1);
      if (plan.duration === "1 año") endDate.setFullYear(now.getFullYear() + 1);

      // Buscar plan activo actual
      const userPlan = await UserPlan.findOne({ id_user: id, active: true });

      if (userPlan) {
        // Solo actualiza si el plan ha cambiado
        const actualId = userPlan.id_plan.toString();
        const nuevoId = id_plan.toString();
        if (actualId !== nuevoId) {
          userPlan.id_plan = id_plan;
          userPlan.start_date = now;
          userPlan.end_date = endDate;
          await userPlan.save();
        }
      } else {
        // Si no tenía plan, crear uno
        await UserPlan.create({
          id_user: id,
          id_plan,
          start_date: now,
          end_date: endDate,
          active: true,
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
