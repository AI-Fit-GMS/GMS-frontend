import { Class, ClassSchedule } from '../types/class.types';

const nowIso = new Date().toISOString();

type ClassQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  status?: string;
};

export const classMockData: Class[] = [
  {
    id: 'class-athletic-strength',
    name: 'Athletic Strength Lab',
    description: 'Hybrid strength session blending tempo lifts with reactive plyometrics for sport-ready power.',
    type: 'strength',
    trainer: {
      id: 'trainer-avery-stone',
      name: 'Avery Stone',
    },
    schedule: {
      dayOfWeek: 1,
      startTime: '07:00',
      endTime: '08:15',
      duration: 75,
    },
    capacity: 18,
    enrolled: 14,
    available: 4,
    location: 'Studio Alpha',
    equipment: ['Barbells', 'Plyo boxes', 'Resistance bands'],
    level: 'intermediate',
    price: 32,
    status: 'active',
    image: undefined,
    createdAt: '2024-01-08T09:00:00.000Z',
    updatedAt: nowIso,
  },
  {
    id: 'class-flow-state',
    name: 'Flow State Conditioning',
    description: 'Breath-led conditioning practice mixing kettlebell flow, mobility, and mindful pacing.',
    type: 'cardio',
    trainer: {
      id: 'trainer-brielle-park',
      name: 'Brielle Park',
    },
    schedule: {
      dayOfWeek: 2,
      startTime: '18:00',
      endTime: '19:00',
      duration: 60,
    },
    capacity: 22,
    enrolled: 20,
    available: 2,
    location: 'Infinity Room',
    equipment: ['Kettlebells', 'Mats', 'Heart rate monitors'],
    level: 'all',
    price: 28,
    status: 'active',
    image: undefined,
    createdAt: '2024-02-10T09:00:00.000Z',
    updatedAt: nowIso,
  },
  {
    id: 'class-combat-engine',
    name: 'Combat Engine 2.0',
    description: 'High-output combat conditioning with sled drags, pad drills, and rotational core work.',
    type: 'crossfit',
    trainer: {
      id: 'trainer-cyrus-levin',
      name: 'Cyrus Levin',
    },
    schedule: {
      dayOfWeek: 3,
      startTime: '19:00',
      endTime: '20:15',
      duration: 75,
    },
    capacity: 16,
    enrolled: 12,
    available: 4,
    location: 'Performance Hangar',
    equipment: ['Sleds', 'Punch shields', 'Battle ropes'],
    level: 'advanced',
    price: 36,
    status: 'active',
    image: undefined,
    createdAt: '2023-12-14T09:00:00.000Z',
    updatedAt: nowIso,
  },
  {
    id: 'class-rebuild',
    name: 'Rebuild & Rise',
    description: 'Rehab-focused strength, stability, and breathwork for members returning from injury.',
    type: 'strength',
    trainer: {
      id: 'trainer-dina-sato',
      name: 'Dina Sato',
    },
    schedule: {
      dayOfWeek: 4,
      startTime: '09:30',
      endTime: '10:30',
      duration: 60,
    },
    capacity: 12,
    enrolled: 9,
    available: 3,
    location: 'Recovery Lab',
    equipment: ['Cables', 'Balance pads', 'Pilates reformer'],
    level: 'beginner',
    price: 34,
    status: 'active',
    image: undefined,
    createdAt: '2024-03-21T09:00:00.000Z',
    updatedAt: nowIso,
  },
  {
    id: 'class-mobility-sculpt',
    name: 'Mobility Sculpt',
    description: 'Low-impact strength and sculpting class emphasising joint articulation and tempo control.',
    type: 'pilates',
    trainer: {
      id: 'trainer-brielle-park',
      name: 'Brielle Park',
    },
    schedule: {
      dayOfWeek: 6,
      startTime: '10:00',
      endTime: '11:00',
      duration: 60,
    },
    capacity: 20,
    enrolled: 17,
    available: 3,
    location: 'Studio Luna',
    equipment: ['Reformer', 'Pilates ring', 'Light dumbbells'],
    level: 'all',
    price: 30,
    status: 'active',
    image: undefined,
    createdAt: '2024-04-02T09:00:00.000Z',
    updatedAt: nowIso,
  },
  {
    id: 'class-sprint-lab',
    name: 'Sprint Mechanics Lab',
    description: 'Technique-first acceleration drills with resisted sprints and mobility prep.',
    type: 'cardio',
    trainer: {
      id: 'trainer-avery-stone',
      name: 'Avery Stone',
    },
    schedule: {
      dayOfWeek: 5,
      startTime: '07:30',
      endTime: '08:30',
      duration: 60,
    },
    capacity: 15,
    enrolled: 11,
    available: 4,
    location: 'Track Deck',
    equipment: ['Sprint sleds', 'Mini hurdles', 'Timing gates'],
    level: 'intermediate',
    price: 35,
    status: 'active',
    image: undefined,
    createdAt: '2024-03-01T09:00:00.000Z',
    updatedAt: nowIso,
  },
];

const toIsoDate = (date: Date) => date.toISOString().split('T')[0];

const buildScheduleForDate = (targetDate: Date): ClassSchedule[] => {
  const dayIndex = targetDate.getDay();
  const formattedDate = toIsoDate(targetDate);

  return classMockData
    .filter((item) => item.schedule.dayOfWeek === dayIndex)
    .map<ClassSchedule>((item) => ({
      date: formattedDate,
      classId: item.id,
      trainerId: item.trainer.id,
      startTime: item.schedule.startTime,
      endTime: item.schedule.endTime,
      enrolled: item.enrolled,
      capacity: item.capacity,
    }));
};

export const buildClassMockResponse = (params?: ClassQueryParams) =>
  buildClassMockPaginatedResponse(params);

const filterClasses = (params?: ClassQueryParams) => {
  if (!params) {
    return classMockData;
  }

  const searchTerm = params.search?.toLowerCase().trim();
  const typeFilter = params.type && params.type !== 'all' ? params.type : undefined;
  const statusFilter = params.status && params.status !== 'all' ? params.status : undefined;

  return classMockData.filter((classItem) => {
    const matchesSearch = searchTerm
      ? [
          classItem.name,
          classItem.description,
          classItem.trainer.name,
          classItem.type,
          ...(classItem.equipment || []),
        ]
          .join(' ')
          .toLowerCase()
          .includes(searchTerm)
      : true;
    const matchesType = typeFilter ? classItem.type === typeFilter : true;
    const matchesStatus = statusFilter ? classItem.status === statusFilter : true;
    return matchesSearch && matchesType && matchesStatus;
  });
};

export const buildClassMockPaginatedResponse = (params?: ClassQueryParams) => {
  const filtered = filterClasses(params);
  const limit = params?.limit && params.limit > 0 ? params.limit : filtered.length || 1;
  const page = params?.page && params.page > 0 ? params.page : 1;
  const offset = (page - 1) * limit;
  const paginated = filtered.slice(offset, offset + limit);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    data: paginated,
    pagination: {
      total,
      totalPages,
      page,
      limit,
    },
  };
};

export const buildClassScheduleMockResponse = (date?: string) => {
  if (date) {
    return { data: buildScheduleForDate(new Date(date)) };
  }

  const today = new Date();
  const schedule: ClassSchedule[] = [];
  for (let offset = 0; offset < 5; offset += 1) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + offset);
    schedule.push(...buildScheduleForDate(nextDate));
  }

  return { data: schedule };
};

