export function useLogin() {
  const toast = useToast();
  const loading = ref<boolean>(false);
  const password = ref<string>();

  const login = async () => {
    loading.value = true;

    try {
      await $fetch("/api/login", {
        method: "POST",
        body: { password: password.value },
      });
    } catch (error) {
      toast.add({
        title: "Wrong password",
        description: error.data?.message,
        color: "red",
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    password,
    login,
  };
}
