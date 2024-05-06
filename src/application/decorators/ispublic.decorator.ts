import { IS_PUBLIC_KEY } from '@/constants';
import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const PublicRoute = () => SetMetadata(IS_PUBLIC_KEY, true);