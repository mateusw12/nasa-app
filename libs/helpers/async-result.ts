export interface AsyncResult<T> {
  data: T | null;
  error: string | null;
}

export const resolveAsync = async <T>(operation: () => Promise<T>): Promise<AsyncResult<T>> => {
  try {
    const data = await operation();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro inesperado ao carregar dados.",
    };
  }
};
