from django.apps import AppConfig


class DogsserviceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'dogsService'
    def ready(self):
        import dogsService.signals 