import { Trainer } from '../types/trainer.types';

const nowIso = new Date().toISOString();

type TrainerQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};

export const trainerMockData: Trainer[] = [
  {
    id: 'trainer-avery-stone',
    firstName: 'Avery',
    lastName: 'Stone',
    email: 'avery.stone@ai-fit.com',
    phone: '+1-555-341-7782',
    specialization: ['Strength & Conditioning', 'Mobility Restoration'],
    experience: 8,
    certifications: ['NASM-CPT', 'Functional Range Conditioning', 'Precision Nutrition L1'],
    bio: 'Functional strength specialist helping athletes rebuild power without compromising longevity.',
    hourlyRate: 85,
    status: 'active',
    focusAreas: ['Powerlifting', 'Hybrid Performance', 'Mobility'],
    nutritionApproach: 'Macro periodisation with recovery-focused supplementation.',
    signaturePrograms: [
      { name: 'Hybrid Power Surge', focus: 'Strength and energy systems', durationWeeks: 8 },
      { name: 'Mobility Recode', focus: 'Joint resilience and posture', durationWeeks: 6 },
    ],
    preferredModalities: ['Barbell complexes', 'Tempo training', 'Kinstretch'],
    schedule: [
      { dayOfWeek: 1, startTime: '06:30', endTime: '13:00' },
      { dayOfWeek: 3, startTime: '10:00', endTime: '18:00' },
      { dayOfWeek: 5, startTime: '08:00', endTime: '14:00' },
    ],
    totalClasses: 42,
    totalMembers: 68,
    rating: 4.9,
    createdAt: '2024-01-12T10:00:00.000Z',
    updatedAt: nowIso,
  },
  {
    id: 'trainer-brielle-park',
    firstName: 'Brielle',
    lastName: 'Park',
    email: 'brielle.park@ai-fit.com',
    phone: '+1-555-903-1466',
    specialization: ['Metabolic Conditioning', 'Mindful Movement'],
    experience: 6,
    certifications: ['ACE-CPT', 'Yoga 200-hr', 'CrossFit L2'],
    bio: 'Breath-driven conditioning coach pairing mindfulness with metabolic efficiency.',
    hourlyRate: 78,
    status: 'active',
    focusAreas: ['Conditioning', 'Yoga Fusion', 'Low-impact Strength'],
    nutritionApproach: 'Seasonal eating with mindful hydration protocols.',
    signaturePrograms: [
      { name: 'Flow State Conditioning', focus: 'Cardio-respiratory endurance', durationWeeks: 10 },
      { name: 'Calm Strength', focus: 'Low-impact strength for busy professionals', durationWeeks: 6 },
    ],
    preferredModalities: ['Kettlebell flow', 'Pilates reformer', 'Vinyasa sequencing'],
    schedule: [
      { dayOfWeek: 2, startTime: '07:30', endTime: '12:30' },
      { dayOfWeek: 4, startTime: '12:00', endTime: '19:00' },
      { dayOfWeek: 6, startTime: '09:00', endTime: '13:00' },
    ],
    totalClasses: 38,
    totalMembers: 54,
    rating: 4.8,
    createdAt: '2024-02-01T10:00:00.000Z',
    updatedAt: nowIso,
  },
  {
    id: 'trainer-cyrus-levin',
    firstName: 'Cyrus',
    lastName: 'Levin',
    email: 'cyrus.levin@ai-fit.com',
    phone: '+1-555-771-2044',
    specialization: ['Combat Conditioning', 'Mobility Strength'],
    experience: 11,
    certifications: ['CSCS', 'StrongFirst SFG II', 'FRC Mobility Specialist'],
    bio: 'Combat-performance mentor focusing on durability, agility, and CNS-friendly hypertrophy.',
    hourlyRate: 92,
    status: 'active',
    focusAreas: ['Combat Conditioning', 'Athletic Mobility', 'Explosive Strength'],
    nutritionApproach: 'High-protein rotational plans with adaptive carb cycling.',
    signaturePrograms: [
      { name: 'Strikeforce Engine', focus: 'Explosive conditioning for fighters', durationWeeks: 12 },
      { name: 'Durability Blueprint', focus: 'Joint armor and structural balance', durationWeeks: 8 },
    ],
    preferredModalities: ['Sled drags', 'Contrast training', 'Animal flow'],
    schedule: [
      { dayOfWeek: 1, startTime: '14:00', endTime: '20:00' },
      { dayOfWeek: 3, startTime: '13:00', endTime: '19:00' },
      { dayOfWeek: 5, startTime: '12:00', endTime: '18:00' },
    ],
    totalClasses: 51,
    totalMembers: 72,
    rating: 4.95,
    createdAt: '2023-11-18T10:00:00.000Z',
    updatedAt: nowIso,
  },
  {
    id: 'trainer-dina-sato',
    firstName: 'Dina',
    lastName: 'Sato',
    email: 'dina.sato@ai-fit.com',
    phone: '+1-555-622-9090',
    specialization: ['Rehab Strength', 'Prenatal Fitness'],
    experience: 9,
    certifications: ['Physiotherapy MSc', 'Prenatal/Postnatal Corrective Exercise', 'Pilates Mat L2'],
    bio: 'Rehab-informed strength coach guiding clients from recovery to resilient performance.',
    hourlyRate: 88,
    status: 'active',
    focusAreas: ['Rehab Strength', 'Prenatal Coaching', 'Stability Training'],
    nutritionApproach: 'Anti-inflammatory templates with micronutrient tracking.',
    signaturePrograms: [
      { name: 'Rebuild and Rise', focus: 'Post-rehab strength progression', durationWeeks: 12 },
      { name: 'Empower Prenatal', focus: 'Trimester-specific stability', durationWeeks: 9 },
    ],
    preferredModalities: ['Cable systems', 'Stability work', 'Reformer Pilates'],
    schedule: [
      { dayOfWeek: 0, startTime: '08:00', endTime: '12:00' },
      { dayOfWeek: 2, startTime: '11:00', endTime: '17:00' },
      { dayOfWeek: 4, startTime: '09:00', endTime: '15:00' },
    ],
    totalClasses: 33,
    totalMembers: 49,
    rating: 4.87,
    createdAt: '2024-03-05T10:00:00.000Z',
    updatedAt: nowIso,
  },
];

export const buildTrainerMockResponse = (params?: TrainerQueryParams) => {
  const searchTerm = params?.search?.toLowerCase().trim();
  const statusFilter = params?.status && params.status !== 'all' ? params.status : undefined;

  let filtered = trainerMockData;

  if (searchTerm) {
    filtered = filtered.filter((trainer) => {
      const haystack = [
        trainer.firstName,
        trainer.lastName,
        trainer.email,
        ...(trainer.specialization || []),
        ...(trainer.focusAreas || []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(searchTerm);
    });
  }

  if (statusFilter) {
    filtered = filtered.filter((trainer) => trainer.status === statusFilter);
  }

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

