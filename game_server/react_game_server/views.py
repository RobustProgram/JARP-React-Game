from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from react_game_server.models import GameState, GameStateChoices
from react_game_server.serializers import GameStateSerializer


# Create your views here.
@csrf_exempt
def game_state_list(request):
    if request.method == 'GET':
        game_states = GameState.objects.all()
        serializer = GameStateSerializer(game_states, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def game_state_specific(request, state_id):
    try:
        game_state = GameState.objects.get(pk=state_id)
    except GameState.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = GameStateSerializer(game_state)
        return JsonResponse(serializer.data)
