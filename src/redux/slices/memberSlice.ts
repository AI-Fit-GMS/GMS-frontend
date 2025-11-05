import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member } from '../../features/members/types/member.types';

interface MemberFilters {
  search: string;
  status: 'all' | 'active' | 'expired' | 'suspended';
  membershipType: 'all' | 'basic' | 'premium' | 'vip';
  sortBy: 'firstName' | 'createdAt' | 'membershipEndDate';
  sortOrder: 'asc' | 'desc';
}

interface MembersState {
  list: Member[];
  currentMember: Member | null;
  filters: MemberFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: MembersState = {
  list: [],
  currentMember: null,
  filters: {
    search: '',
    status: 'all',
    membershipType: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

const memberSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<MemberFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    clearCurrentMember: (state) => {
      state.currentMember = null;
    },
  },
});

export const { setFilters, resetFilters, setPage, clearCurrentMember } = memberSlice.actions;
export default memberSlice.reducer;

