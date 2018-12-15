from django.urls import path
from react_game_server import views

urlpatterns = [
    path('', views.game_state_list),
    path('<state_id>', views.game_state_specific),
]
